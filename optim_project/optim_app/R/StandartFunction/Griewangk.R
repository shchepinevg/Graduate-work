Griewangk <- R6Class("Griewangk",
                     inherit = Func,
                     public = list(
                       initialize = function(dim) {
                         private$dim = dim
                         private$real_min = list(pos = rep(0,dim),value = 0)
                         private$border = list(continuous = list(lower = rep(-600,dim),
                                                                 upper = rep(600,dim)))
                         
                       }
                     ),
                     private = list(
                       name = "Griewangk",
                       func = function(continuous,discrete){
                         x = continuous
                         y = 1
                         for (i in 1:length(x)){
                           y = y*cos(x[i]/sqrt(i))
                         }
                         return(sum(x^2)/4000+1-y)}
                     )
)