Rosenbrock <- R6Class("Rosenbrock",
                      inherit = Func,
                      public = list(
                        initialize = function(dim) {
                          private$dim = dim
                          private$real_min = list(pos = rep(1,dim),value = 0)
                          private$border = list(continuous = list(lower = rep(-2.048,dim),
                                                                  upper = rep(2.048,dim)))
                        }
                      ),
                      private = list(
                        name = "Rosenbrock",
                        func = function(continuous,discrete){ 
                          x = continuous
                          x1 = x[1:(length(x)-1)]
                          x2 = x[2:length(x)]
                          return(sum(100*(x2-x1^2)^2+(1-x1)^2))
                        }
                      )
)