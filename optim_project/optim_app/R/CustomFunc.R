CustomFunc <- R6Class("CustomFunc",
                inherit = Func,
                public = list(
                  initialize = function(str,param,minimization) {
                    private$path = str
                    private$minimization = minimization
                    private$indexes = sapply(param, function(x){as.numeric(x[2])})
                    indexes_cont = which(private$indexes == 1)
                    indexes_disc = which(private$indexes == 2)
                    private$border = list(continuous = list(lower = sapply(param[indexes_cont], function(x){as.numeric(x[3])}),
                                                            upper = sapply(param[indexes_cont], function(x){as.numeric(x[4])}),
                                                            name = sapply(param[indexes_cont], function(x){x[1]})),
                                          discrete = list(lower = sapply(param[indexes_disc], function(x){as.numeric(x[3])}),
                                                          upper = sapply(param[indexes_disc], function(x){as.numeric(x[4])}),
                                                          name = sapply(param[indexes_disc], function(x){x[1]})))
                    param <<- list(indexes = private$indexes,path = private$path,min = private$minimization)
                    
                    
                  },
                  get_indexes = function(){
                    return(private$indexes)
                  },
                  get_type = function(){
                    return("CustomFunc")
                  }
                  
                ),
               
                private = list(
                  path = "",
                  indexes = "",
                  minimization = TRUE,
                  func = function(continuous,discrete){
                    if (is.null(discrete)){
                      result = as.numeric(system2(param$path,stdout = TRUE,  args = continuous))
                    } else {
                      indexes_cont = which(param$indexes == 1)
                      indexes_disc = which(param$indexes == 2)
                      input = numeric(length = length(param$indexes))
                      input[indexes_cont] = continuous
                      input[indexes_disc] = discrete
                      result = as.numeric(system2(param$path,stdout = TRUE,  args = input))
                    }
                    if(param$min){
                      return(result)
                    } else {
                      return(-result)
                    }
                    
                    
                    # param <<- list(indexes = private$indexes,path = private$path,min = private$minimization)
                    # fitness = function(continuous,discrete){
                    #   indexes_cont = which(param$indexes == 1)
                    #   indexes_disc = which(param$indexes == 2)
                    #   input = numeric(length = length(param$indexes))
                    #   input[indexes_cont] = continuous
                    #   input[indexes_disc] = discrete
                    #   result = as.numeric(system2(param$path,stdout = TRUE,  args = input))
                    #   if(param$min){
                    #     return(result)
                    #   } else {
                    #     return(-result)
                    #   }
                    # }
                    # return(fitness)
                  }
                )
)