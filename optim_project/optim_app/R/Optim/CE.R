library("CEoptim")
#Минимизация
CE <- R6Class("CE",
              inherit = Optim,
              public = list(
                initialize = function(N,func) {
                  dim = func$get_dim()$continuous +  func$get_dim()$discrete
                  super$initialize(N,func,dim)
                  private$params = list(discrete   = list(lower = c(10*dim),
                                                          upper = c(N/2),
                                                          default = c(get_default_N_pop(dim,N)),
                                                          name = c("N_pop")),
                                        continuous = list(lower = c(0.1),
                                                          upper = c(0.9999),
                                                          default = c(0.1),
                                                          name = c("rho")))
                  private$dim = dim
                  private$N = N
                  private$func = func
                }
                
              ),
              private = list(
                name = "Cross-Entropy algorithm",
                DeNormalFunc = function(z,lower,upper){
                  return((z*(upper-lower)+upper+lower)/2)
                },
                CE_MShell = function(continuous,discrete,lower,upper,DeNormalFunc,func){
                  continuous = DeNormalFunc(continuous,lower,upper)
                  result = func(continuous,discrete+self$get_func()$get_Pdiscrete()$lower)
                  return(result$value)
                },
                CE_Shell = function(continuous,lower,upper,DeNormalFunc,func){
                  continuous = DeNormalFunc(continuous,lower,upper)
                  result = func(continuous)
                  return(result)
                },
                optim = function(continuous,discrete,point){
                  Cdim = private$func$get_dim()$continuous
                  mu0 = rep(0,Cdim)
                  sigma0 = rep(1,Cdim)
                  A = rbind(diag(Cdim),-diag(Cdim))
                  B = rep(1,2*Cdim)
                  Pdiscrete = NULL
                  if (private$func$get_dim()$discrete != 0){
                    Pdiscrete = list(categories = as.integer(self$get_func()$get_Pdiscrete()$upper - self$get_func()$get_Pdiscrete()$lower))
                    fitness = function(continuous,discrete,lower,upper,DeNormalFunc,func){
                      continuous = DeNormalFunc(continuous,lower,upper)
                      result = func(continuous,discrete+self$get_func()$get_Pdiscrete()$lower)
                      return(result)
                    }
                  } else {
                    fitness = function(continuous,lower,upper,DeNormalFunc,func){
                      continuous = DeNormalFunc(continuous,lower,upper)
                      result = func(continuous,NULL)
                      return(result)
                    }
                  }
                 
                  res <<- CEoptim(f = fitness,f.arg = list(lower = private$func$get_Pcontinuous()$lower,
                                                      upper = private$func$get_Pcontinuous()$upper,
                                                      DeNormalFunc = private$DeNormalFunc,
                                                      func = private$func$get_fitness()),
                                   continuous=list(mean = mu0,sd = sigma0, conMat=A,conVec = B), 
                                   discrete = Pdiscrete,
                                   maximize=FALSE,
                                   N = round(discrete[1]),
                                   rho = continuous[1],
                                   iterThr = round(private$N/discrete[1]))
                  res_c = private$DeNormalFunc(res$optimizer$continuous,private$func$get_Pcontinuous()$lower,private$func$get_Pcontinuous()$upper)
                  if (private$func$get_dim()$discrete != 0){
                    res_d = res$optimizer$discrete+self$get_func()$get_Pdiscrete()$lower
                    result = list(pos = c(res_c,res_d),value = res$optimum)
                  } else {
                    result = list(pos = res_c,value = res$optimum)
                  }
                
                  return(result)
                }
                
              )
)