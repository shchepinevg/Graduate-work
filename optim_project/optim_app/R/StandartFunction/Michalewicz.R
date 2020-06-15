Michalewicz <- R6Class("Michalewicz",
                       inherit = Func,
                       public = list(
                         initialize = function(dim) {
                           private$dim = dim
                           private$real_min = list(pos = NA,value = NA)
                           private$border = list(continuous = list(lower = rep(0,dim),
                                                                   upper = rep(pi,dim)))
                         }
                       ),
                       private = list(
                         name = "Michalewicz",
                         func = function(continuous,discrete){
                           x = continuous
                           y = 0
                           for (i in 1:length(x)){
                             y = y+sin(x[i])*(sin(i*x[i]^2/pi)^20)
                           }
                           return(-y)
                         }
                       )
)