DeJong <- R6Class("DeJong",
                  inherit = Func,
                  public = list(
                    initialize = function(dim) {
                      private$dim = dim
                      private$real_min = list(pos = rep(0,dim),value = 0)
                      private$border = list(continuous = list(lower = rep(-5.12,dim),
                                                              upper = rep(5.12,dim)))
                    }
                  ),
                  private = list(
                    name = "De Jong",
                    func = function(continuous,discrete){
                      x = continuous
                      return(sum(x^2))
                    }
                  )
)