Schwefel <- R6Class("Schwefel",
                    inherit = Func,
                    public = list(
                      initialize = function(dim) {
                        private$dim = dim
                        private$real_min = list(pos = rep(420.9687,dim),value = -418.9829*dim)
                        private$border = list(continuous = list(lower = rep(-500,dim),
                                                                upper = rep(500,dim)))
                      }
                    ),
                    private = list(
                      name = "Schwefel",
                      func = function(continuous,discrete){ 
                        x = continuous
                        return(sum(-x*sin(sqrt(abs(x)))))
                      }
                    )
)