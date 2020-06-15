Ackley <- R6Class("Ackley",
                  inherit = Func,
                  public = list(
                    initialize = function(dim) {
                      private$dim = dim
                      private$real_min = list(pos = rep(0,dim),value = 0)
                      private$border = list(continuous = list(lower = rep(-32.768,dim),
                                                              upper = rep(32.768,dim)))
                    }
                  ),
                  private = list(
                    name = "Ackley",
                    func = function(continuous,discrete){
                      x = continuous
                      return(-20*exp(-0.2*sqrt(sum(x^2)/length(x)))-exp(sum(cos(2*pi*x))/length(x))+20+exp(1))
                    }
                  )
)