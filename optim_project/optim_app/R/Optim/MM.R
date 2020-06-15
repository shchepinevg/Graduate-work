
library("kernlab")
MM <- R6Class("MM",
              inherit = Optim,
              public = list(
                initialize = function(N,func) {
                  dim = func$get_dim()$continuous + func$get_dim()$discrete
                  super$initialize(N,func,dim)
                  private$params = list(discrete   = list(lower = rep(10*dim,10*dim,2,1,100,1),
                                                          upper = c(N/2,100*dim,10,10,300,7),
                                                          default = c(get_default_N_pop(dim,N),250,5,10,200,2),
                                                          name = c("N_parents","N_offsprings","count_CV_blocks","recalc_period","max_size_sample","Strategy")),
                                        continuous = list(lower = c(1,0,0),
                                                          upper = c(5,2,1),
                                                          default = c(2,0.8,0.5),
                                                          name = c("Pow_mut","F","C")))
                  private$dim = dim
                  private$N = N
                  private$func = func
                }
                
              ),
              private = list(
                name = "Metamodelling algorithm",
                gp_fit = function(train,k,kernel = NULL){
                  n = ncol(train)-1
                  if (is.null(kernel)){
                    kernels = c("rbfdot","polydot","vanilladot","tanhdot","laplacedot","besseldot","anovadot","splinedot")
                    MSE_mas = numeric(length = length(kernels))
                    for (i in 1:length(kernels)){
                      presense_error = FALSE
                      tryCatch({
                        gp = gausspr(x = train[,1:n], y = train[,n+1],type = "regression",kernel = kernel,kpar="automatic")
                       
                        
                      },error = function(cond){
                        presense_error = TRUE
                      })
                      if (!presense_error){
                        MSE_mas[i] = gp@cross
                      } else {
                        MSE_mas[i] = Inf
                      }
                    }
                    kernel = kernels[which.min(MSE_mas)]
                  }
                  gp = gausspr(x = train[,1:n], y = train[,n+1],type = "regression",kernel = kernel,kpar="automatic")
                  
                  return(list(gp = gp,kern = kernel))
                },
                gp_pred = function(gp,X){
                  b <- as.vector(predict(gp,X))
                  return(b)
                },
                MetaModelling = function(fitness,lower,upper,parents_size,itermax,offsprings_size,params_train,params_mut,strategy,max_size_sample){
                  n = length(lower)
                  count_CV_blocks = params_train[1]
                  recalc_period = params_train[2]
                  print("metamodel fit")
                  while(TRUE){
                    tryCatch({
                      #Формирование родительских особей
                      parents = matrix(0,nrow = parents_size,ncol = (n+1))
                      for (i in 1:parents_size){
                        parents[i,1:n] = runif(n,lower,upper)
                        parents[i,(n+1)] = fitness(parents[i,1:n])
                      }
                      order_sort = sort(parents[,(n+1)],index.return = TRUE)$ix
                      parents = parents[order_sort,]
                      train = unique(parents)
                      #Настройка метамодели
                      res = gp_fit(train,count_CV_blocks)
                      gp = res$gp
                      kern = res$kern
                      #В случае отсутствие ошибки - выход из цикла
                      break
                    },error = function(cond){
                      print("error metamodel fit")
                    })
                  }
                  
                  #Проверка на размер обучающей выборки
                  if (nrow(train) > max_size_sample){
                    print("train data reduced")
                    order_sort = sort(train[,(n+1)],index.return = TRUE)$ix
                    train = train[order_sort,]
                    train = train[1:max_size_sample,]
                  }
                  
                  #Проход по итерациям
                  for (i in 1:itermax){
                    print(paste("iteration",i))
                    
                    while(TRUE){
                      tryCatch({
                        # генерация мутированных отпрысков
                        offsprings = matrix(0,nrow = offsprings_size,ncol = (n+1))
                        dither_const = (1-params_mut[2])*runif(1,0,1)+params_mut[2]
                        for (j in 1:offsprings_size){
                          #Выбор стратегии
                          switch (strategy,
                                  {#стратегия 1
                                    current_parents = parents[sample(1:parents_size,3),]
                                    offsprings[j,1:n] = current_parents[1,1:n]+params_mut[2]*(current_parents[2,1:n]-current_parents[3,1:n])
                                  },
                                  {#стратегия 2
                                    current_parents = parents[sample(1:parents_size,3),]
                                    offsprings[j,1:n] = parents[1,1:n] +current_parents[1,1:n]+params_mut[2]*(current_parents[2,1:n]-current_parents[3,1:n])
                                  },
                                  {#стратегия 3
                                    current_parents = parents[sample(1:parents_size,2),]
                                    jitter = 0.0001*runif(1,0,1)+params_mut[2]
                                    offsprings[j,1:n] = parents[1,1:n] +jitter+params_mut[2]*(current_parents[1,1:n]-current_parents[2,1:n])
                                  },
                                  {#стратегия 4
                                    current_parents = parents[sample(1:parents_size,3),]
                                    dither = (1-param_mut[2])*runif(1,0,1)+params_mut[2]
                                    offsprings[j,1:n] = parents[1,1:n] +dither+(current_parents[2,1:n]-current_parents[3,1:n])
                                  },
                                  {#стратегия 5
                                    current_parents = parents[sample(1:parents_size,3),]
                                    offsprings[j,1:n] = parents[1,1:n] +dither_const+(current_parents[2,1:n]-current_parents[3,1:n])
                                  },
                                  {#стратегия 6
                                    current_parents = parents[sample(1:parents_size,3),]
                                    if (runif(1,0,1) < 0.5){
                                      offsprings[j,1:n] = current_parents[1,1:n]+params_mut[2]*(current_parents[2,1:n]-current_parents[3,1:n])
                                    } else {
                                      offsprings[j,1:n] = current_parents[1,1:n]+(params_mut[2]+1)/2*(current_parents[2,1:n]+current_parents[3,1:n]-2*current_parents[1,1:n])
                                    }
                                  },
                                  {#стратегия 7*
                                    current_parent = parents[sample(1:parents_size,1),]
                                    offsprings[j,1:n] = current_parent + runif(n,-0.5,0.5)*params_mut[1]
                                  })
                          #Проверка точки на принадлежность области и корректировка координат
                          offsprings[j,1:n] = apply(cbind(lower,offsprings[j,1:n],upper),1,function(x){min(max(x[2],x[1]),x[3])})
                          #случайная замена координат потомка координатами родителя
                          id_parent = j %% parents_size + 1
                          prob = runif(n,0,1)
                          indexes_mut = which((prob > 1-params_mut[3]) == T)
                          offsprings[j,indexes_mut] = parents[id_parent,indexes_mut]
                          #получение предсказания для ребенка и для родителя. А стоит ли верить модели?
                        }
                        
                        
                        offsprings[,(n+1)] = gp_pred(gp,offsprings[,1:n])
                        
                        #Сортировка точек по возрастанию значения модели
                        order_sort = sort(offsprings[,n+1],index.return = TRUE)$ix
                        offsprings = offsprings[order_sort,]
                        offsprings = unique(offsprings)
                        
                        #Отбор самых лучших уникальных точек
                        count_best_offsprings = 0
                        index_offspring = 1
                        best_offsprings = matrix(0,ncol = (n+1),nrow = parents_size)
                        best_offsprings_indexes = c()
                        while(count_best_offsprings < parents_size){
                          #Проверка отсутствие точки в обучающей выборке 
                          if (!any(apply(train[,1:n], 1,function(x){all(x == offsprings[index_offspring,1:n])}))){
                            count_best_offsprings = count_best_offsprings+1
                            best_offsprings[count_best_offsprings,1:n] = offsprings[index_offspring,1:n]
                            best_offsprings[count_best_offsprings,n+1] = fitness(offsprings[index_offspring,1:n])
                            best_offsprings_indexes[count_best_offsprings] = index_offspring
                          }
                          index_offspring = index_offspring +1
                          if (index_offspring > nrow(offsprings)){
                            break
                          }
                        }
                        
                        #Обучение модели с новыми данными
                        prob_train = rbind(train,best_offsprings[1:count_best_offsprings,])
                        
                        #Проверка на размер обучающей выборки
                        if (nrow(prob_train) > max_size_sample){
                          order_sort = sort(prob_train[,n+1],index.return = TRUE)$ix
                          prob_train = prob_train[order_sort,]
                          prob_train = prob_train[1:max_size_sample,]
                        }
                        if (i %% recalc_period == 0){
                          res = gp_fit(prob_train,count_CV_blocks)
                        } else {
                          res = gp_fit(prob_train,count_CV_blocks,kern)
                        }
                        gp = res$gp
                        kern = res$kern
                        
                        #В случае отсутствия ошибки - выход из цикла
                        break
                      },error = function(cond){
                        print(cond)
                        print("error new model fit")
                      })
                    }
                    train = prob_train
                    
                    parents = train[1:parents_size,]
                    
                    id_best = which.min(train[,n+1])
                    print(paste("best: pos =",paste0(round(train[id_best,1:n],3),collapse = " ")," val =",round(train[id_best,n+1],3)," size_train =",nrow(train)))
                  }
                  
                  result = list(pos = train[id_best,1:n],value = train[id_best,n+1])#,errors = count_of_errors)
                  return(result)
                },
                optim = function(continuous,discrete,point){
                  fitness = function(x){
                    continuous = x[1:private$func$get_dim()$continuous]
                    discrete = round(x[-(1:private$func$get_dim()$continuous)])
                    y = private$func$get_fitness()(continuous,discrete);return(-y)}
                  if (private$func$get_dim()$discrete == 0){
                    lower_disc = NULL
                    upper_disc = NULL
                  } else {
                    lower_disc = private$func$get_Pdiscrete()$lower-0.49
                    upper_disc = private$func$get_Pdiscrete()$upper+0.49
                  }
                  res =  private$MetaModelling(fitness = fitness,
                                               lower = c(private$func$get_Pcontinuous()$lower,lower_disc), 
                                               upper = c(private$func$get_Pcontinuous()$upper,upper_disc), 
                                          parents_size = discrete[1],
                                          itermax = round(private$N/discrete[1]),
                                          offsprings_size = discrete[2],
                                          params_train = discrete[3:4],
                                          params_mut = continuous,
                                          strategy = discrete[6],
                                          max_size_sample = discrete[5])
                  pos = as.numeric(res$pos)
                  pos[-(1:private$func$get_dim()$continuous)] = round(pos[-(1:private$func$get_dim()$continuous)])
                  result = list(pos = pos,value = res$value)
                  return(result)
                }
                
              )
)
