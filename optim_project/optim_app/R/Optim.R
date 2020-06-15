library("R6")
Optim <- R6Class("Optim",
                  public = list(
                    initialize = function(N,func,dim) {
                      if (N != round(N)){
                        stop(paste("Invalid value for parameter N. It must be an integer"))
                      }
                      if (N < 10*dim){
                        stop(paste("Invalid value for parameter N. The minimum value is",10*dim))
                      }
                    },
                    
                    get_Pdiscrete = function(){
                      return(private$params$discrete)
                    },
                    get_Pcontinuous = function(){
                      return(private$params$continuous)
                    },
                    get_dim = function(){
                      return(list(discrete = length(private$params$discrete$lower),continuous = length(private$params$continuous$lower)))
                    },
                    get_dim_task = function(){
                      return(private$dim)
                    },
                    get_name = function(){
                      return(private$name)
                    },
                    get_func = function(){
                      return(private$func)
                    },
                    run = function(continuous,discrete,point = NULL){
                      result = private$optim(continuous,discrete,point)
                      if (private$func$get_type() == "CustomFunc"){
                        indexes = private$func$get_indexes()
                        indexes_cont = which(indexes == 1)
                        indexes_disc = which(indexes == 2)
                        input = numeric(length = length(indexes))
                        input[indexes_cont] = result$pos[1:private$func$get_dim()$continuous]
                        input[indexes_disc] = result$pos[-(1:private$func$get_dim()$continuous)]
                        result$pos = input
                      }
                      return(result)
                    },
                    run_default = function(point = NULL){
                      
                      return(self$run(private$params$continuous$default,private$params$discrete$default,point))
                    },
                    check_params = function(continious,discrete){
                      if (self$get_dim()[[1]] == length(discrete) && self$get_dim()[[2]] == length(continious)){
                        
                        if (!any(is.na(as.numeric(discrete))) && !any(is.na(as.numeric(continious)))){
                          discrete = as.numeric(discrete)
                          continious = as.numeric(continious)
                          if (all(round(discrete) == discrete)){
                            if (all(discrete >= self$get_Pdiscrete()$lower) && all(discrete <= self$get_Pdiscrete()$upper) && all(continious >= self$get_Pcontinuous()$lower) && all(continious <= self$get_Pcontinuous()$upper)){
                              return(list(value = TRUE))
                            } else {
                              return(list(value = FALSE,error = "Некорретный ввод параметров. Значение одного или нескольких параметров выходит за диапазон"))
                            }
                          } else {
                            return(list(value = FALSE,error = "Некорретный ввод дискретных параметров. Метки должны быть целыми числами"))
                          }
                        } else {
                          return(list(value = FALSE,error = "Некорретный ввод параметров. Значения параметров должны быть числами"))
                        }
                        
                      } else {
                        return(list(value = FALSE,error = "Кол-во дискретных или непрерывных параметров не соотвествует исходному кол-ву в алгоритме"))
                      }
                    },
                    check_point = function(point){
                      point = strsplit(point," ")[[1]]
                      if (length(point) == self$get_dim_task()){
                        if (!any(is.na(as.numeric(point)))){
                          point = as.numeric(point)
                          if (all(self$get_func()$get_Pcontinuous()$upper >= point) && all(self$get_func()$get_Pcontinuous()$lower <= point)){
                            return(list(value = TRUE,point = point))
                          } else {
                            return(list(value = FALSE,error = paste0("Одна или несколько координат начальной точки вне диапазона:\n(",
                                                                     paste0(self$get_func()$get_Pcontinuous()$lower,collapse = " "),
                                                                     ") <= point <= (",
                                                                     paste0(self$get_func()$get_Pcontinuous()$upper,collapse = " "),")")))
                          }
                        } else {
                          return(list(value = FALSE,error = "Одна или несколько координат начальной точки не является числом"))
                        }
                      } else {
                        return(list(value = FALSE,error = paste0("Размерность начальной точки не соответствует заданной: ",self$get_dim_task())))
                      }
                    },
                    get_info = function(){
                      #Нужно будет переделать т.к. dim может равен 0
                      result = c()
                      if (self$get_dim()$discrete != 0){
                        for (i in 1:(self$get_dim()$discrete)){
                          result[i] = paste0(self$get_Pdiscrete()$name[i],", дискретный, от ",self$get_Pdiscrete()$lower[i]," до ",self$get_Pdiscrete()$upper[i],", (",self$get_Pdiscrete()$default[i],")")
                        }
                      }
                      if (self$get_dim()$continuous != 0){
                        for (i in 1:(self$get_dim()$continuous)){
                          result[i+self$get_dim()$discrete] = paste0(self$get_Pcontinuous()$name[i],", непрерывный, от ",self$get_Pcontinuous()$lower[i]," до ",self$get_Pcontinuous()$upper[i],", (",self$get_Pcontinuous()$default[i],")")
                        }
                      }
                      return(result)
                    }
                  ),
                  
                  private = list(
                    name = as.character(),                   #Имя алгоритма
                    params = list(),                         #Имена параметров алгоритма и их область определения
                    optim = function(continuous,discrete){}, #сам алгоритм
                    func = as.character(),                   #целевая функция
                    dim = as.integer(),                      #Размерность целевой функции
                    N = as.integer()                         #Кол-во запусков целевой функции
                  )
)