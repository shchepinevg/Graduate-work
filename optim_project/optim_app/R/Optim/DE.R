library("DEoptim")
#ћинимизаци€
DE <- R6Class("DE",
              inherit = Optim,
              public = list(
                initialize = function(N,func) {
                  
                  dim = func$get_dim()$continuous +  func$get_dim()$discrete
                  super$initialize(N,func,dim)
                  #DE не может оптимизировать дискретные параметры.
                  #ќптимизируем непрерывные параметры. дл€ дискретных - используем рекомендованные значени€ 
                  private$params = list(discrete   = list(lower = c(10*dim,1),
                                                          upper = c(N/2,6),
                                                          default = c(get_default_N_pop(dim,N),2),
                                                          name = c("N_pop","Strategy")),
                                        continuous = list(lower = c(rep(0,3)),
                                                          upper = c(1,2,1),
                                                          default = c(0.5,0.8,0),
                                                          name = c("CR","F","C")))
                  private$dim = dim
                  private$N = N
                  private$func = func
                }
                
              ),
              private = list(
                name = "Differential evolution",
                optim = function(continuous,discrete,point){
                  Pdiscrete = NULL
                  if (private$func$get_dim()$discrete != 0){
                    Pdiscrete <- private$func$get_Pdiscrete()$default
                  }
                  if (private$func$get_dim()$discrete == 0){
                    lower_disc = NULL
                    upper_disc = NULL
                    fitness = function(x){
                      y = private$func$get_fitness()(x,NULL);return(y)}
                    
                  } else {
                    lower_disc = private$func$get_Pdiscrete()$lower-0.49
                    upper_disc = private$func$get_Pdiscrete()$upper+0.49
                    fitness = function(x){
                      continuous = x[1:private$func$get_dim()$continuous]
                      discrete = round(x[-(1:private$func$get_dim()$continuous)])
                      y = private$func$get_fitness()(continuous,discrete);return(y)}
                    
                  }
                  if (private$func$get_dim()$continuous == 0){
                    lower = lower_disc
                    upper = upper_disc
                  } else {
                    lower = c(private$func$get_Pcontinuous()$lower,lower_disc) 
                    upper = c(private$func$get_Pcontinuous()$upper,upper_disc)
                  }
                  res <<- DEoptim(fitness,
                                  lower = lower, 
                                  upper = upper, 
                                  control = DEoptim.control(VTR = -Inf, strategy = discrete[2], FALSE, 
                                                            NP = discrete[1],
                                                            itermax = round(private$N/discrete[1]),
                                                            CR = continuous[1],
                                                            continuous[2],
                                                            c = continuous[3],
                                                            trace = FALSE))
                  pos = as.numeric(res$optim$bestmem)
                  pos[-(1:private$func$get_dim()$continuous)] = round(pos[-(1:private$func$get_dim()$continuous)])
                  result = list(pos = pos,value = res$optim$bestval)
                  return(result)
                }
                
              )
)