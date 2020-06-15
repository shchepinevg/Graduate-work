library("R6")
MFunc <- R6Class("MFunc",
                inherit = Func,
                public = list(
                  initialize = function(optim,k) {
                    if (k != round(k)){
                      stop(paste("Invalid value for parameter k. It must be an integer"))
                    }
                    if (k < 1){
                      stop("Invalid value for parameter k. The minimum value is 1")
                    }
                    private$name = paste0("Shell of ",optim$get_name())
                    private$k = k
                    private$dim = optim$get_dim()
                    private$border = list(discrete = optim$get_Pdiscrete(),continuous = optim$get_Pcontinuous())
                    private$optim = optim
                    private$real_min$value = optim$get_func()$get_real_min_val()
                  }, 
                  get_fitness = function(){
                    fitness = function(continuous,discrete){
                      y = private$func(continuous,discrete)
                      return(y$value)
                    }
                    return(fitness)
                  },
                  get_type = function(){
                    return("MFunc")
                  }
                ),
                
                private = list(
                  k = as.integer(),
                  optim = as.character(),
                  func = function(continuous,discrete){
                    bestmin = list(pos = NA, value = Inf)
                    for (i in 1:private$k) {
                      result = private$optim$run(continuous,discrete)
                      
                      if (result$value < bestmin$value)
                        bestmin = result
                    }
                    return(bestmin)
                  },
                  real_min = list(pos = NA,value = NA)
                )
)