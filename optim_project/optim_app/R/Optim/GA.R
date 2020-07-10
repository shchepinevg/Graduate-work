library("GA")
#ћаксимизаци€
GA <- R6Class("GA",
              inherit = Optim,
              public = list(
                initialize = function(N,func) {
                  dim = func$get_dim()$continuous +  func$get_dim()$discrete
                  super$initialize(N,func,dim)
                  #GA не может оптимизировать дискретные параметры.
                  #ќптимизируем непрерывные параметры. дл€ дискретных - используем рекомендованные значени€ 
                  private$params = list(discrete   = list(lower = c(10*dim,rep(1,4)),
                                                          upper = c(N/2,4,5,4,50),
                                                          default = c(get_default_N_pop(dim,N),2,2,1,10),
                                                          name = c("N_pop","Selection","Crossover","Mutation","Mut_pow")),
                                        continuous = list(lower = c(rep(0,3),1,rep(0,3)),
                                                          upper = c(rep(1,3),5,rep(1,3)),
                                                          default = c(0.1,0.8,0.05,3,0.5,0,0.15),
                                                          name = c("P_mut","P_cross","Elitism","Sel_tour_k","Cross_blx_a","Cross_lpc_a","Cross_lpc_b")))
                  private$dim = dim
                  private$N = N
                  private$func = func
                }
                
              ),
              private = list(
                name = "Genetic algorithm",
                optim = function(continuous,discrete,point){
                  str1_S = switch(discrete[2],
                                  "lr",
                                  "ls",
                                  "rw",
                                  "tour")
                  str1_C = switch(discrete[3],
                                  "blx",
                                  "la",
                                  "laplace",
                                  "sp",
                                  "wa")
                  str1_M = switch(discrete[4],
                                  "ra",
                                  "nra",
                                  "pow",
                                  "rs")
                  str2_S = "Selection"
                  str2_C = "Crossover"
                  str2_M = "Mutation"
                  Selection = paste0("gareal_",str1_S,str2_S)
                  Crossover = paste0("gareal_",str1_C,str2_C)
                  Mutation = paste0("gareal_",str1_M,str2_M)
                  if (Selection == "gareal_tourSelection"){
                    Selection = function(...) gareal_tourSelection(..., k = continuous[4])
                  }
                  if (Crossover == "gareal_blxCrossover"){
                    Crossover = function(...) gareal_blxCrossover(..., a = continuous[5])
                  }else if (Crossover == "gareal_laplaceCrossover"){
                    Crossover = function(...) gareal_laplaceCrossover(..., a = continuous[6], b = continuous[7])
                  }
                  if (Mutation == "gareal_powMutation"){
                    Mutation = function(...) gareal_powMutation(..., pow = discrete[5])
                  }
                  if (private$func$get_dim()$discrete == 0){
                    lower_disc = NULL
                    upper_disc = NULL
                    fitness = function(x){
                      y = private$func$get_fitness()(x,NULL);return(-y)}
                    
                  } else {
                    lower_disc = private$func$get_Pdiscrete()$lower-0.49
                    upper_disc = private$func$get_Pdiscrete()$upper+0.49
                    fitness = function(x){
                      continuous = x[1:private$func$get_dim()$continuous]
                      discrete = round(x[-(1:private$func$get_dim()$continuous)])
                      y = private$func$get_fitness()(continuous,discrete);return(-y)}
                    
                  }
                  if (private$func$get_dim()$continuous == 0){
                    lower = lower_disc
                    upper = upper_disc
                  } else {
                    lower = c(private$func$get_Pcontinuous()$lower,lower_disc) 
                    upper = c(private$func$get_Pcontinuous()$upper,upper_disc)
                  }
                  res <<-  ga(type = "real-valued",
                              fitness = fitness,
                              lower = lower, 
                              upper = upper, 
                              popSize = discrete[1],
                              maxiter = round(private$N/discrete[1]),
                              elitism = continuous[3],
                              pmutation = continuous[1],
                              pcrossover = continuous[2],
                              selection = Selection,
                              crossover = Crossover,
                              mutation = Mutation,
                              monitor = F)
                  pos = as.numeric(res@solution[1,])
                  pos[-(1:private$func$get_dim()$continuous)] = round(pos[-(1:private$func$get_dim()$continuous)])
                  result = list(pos = pos,value = -res@fitnessValue)
                  return(result)
                }
                
              )
)
