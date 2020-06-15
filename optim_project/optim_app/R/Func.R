library("R6")
Func <- R6Class("Func",
                  public = list(
                    get_Pdiscrete = function(){
                      return(private$border$discrete)
                    },
                    get_Pcontinuous = function(){
                      return(private$border$continuous)
                    },
                    get_name = function(){
                      return(private$name)
                    },
                    get_value = function(x){
                      return(private$func(x))
                    },
                    get_real_min_pos = function(){
                      return(private$real_min$pos)
                    },
                    get_real_min_val = function(){
                      return(private$real_min$val)
                    },
                    get_func = function(){
                      return(private$func)
                    },
                    get_type = function(){
                      return("Func")
                    },
                    get_fitness = function(){
                      fitness = function(continuous,discrete){
                        y = private$func(continuous,discrete)
                        return(y)
                      }
                      return(fitness)
                    },
                    get_dim = function(){
                      return(list(discrete = length(private$border$discrete$lower),continuous = length(private$border$continuous$lower)))
                    }
                  ),
                  
                  private = list(
                    name = as.character(), #Имя функции
                    func = function(continuous,discrete){}, #Сама функция
                    border = list(),       #Границы области определения функции
                    real_min = list(),     #Координаты и значение глобального минимума
                    dim = as.integer()     #Размерность пространства
                  )
)