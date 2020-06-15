#Минимизация
HJ <- R6Class("HJ", 
              inherit = Optim,
              public = list(
                initialize = function(N, func) {
                  dim = func$get_dim()$continuous
                  point = runif(dim, func$get_Pcontinuous()$lower, func$get_Pcontinuous()$upper)
                  distance = func$get_Pcontinuous()$upper-func$get_Pcontinuous()$lower
                  
                  private$params = list(discrete = list(lower = c(1),
                                                        upper = c(25),
                                                        default = c(2),
                                                        name = c("e")),
                                        continuous = list(lower = c(0.01*distance, rep(0.01, dim), 1),
                                                          upper = c(0.8*distance, rep(0.99, dim), 3),
                                                          default = c(0.5*distance, rep(0.5, dim), 2),
                                                          name = c(paste0("d", 1:dim), paste0("a", 1:dim), "lambda"))
                  )
                  
                  private$dim = dim
                  private$N = N
                  private$func = func
                  private$point = point
                },
                get_point = function () { return(private$point) }
              ),
              private = list(
                name = "Hooke-Jeeves Method",
                point = c(),
                hj = function (func_to_optimize,X,d,a,l,e, max_iter,lower_border, upper_border){
                  is_over = FALSE
                  cur_basis = X
                  new_basis = cur_basis 
                  cur_min = func_to_optimize(cur_basis)
                  new_cur_min = cur_min
                  for (j in 1:max_iter){
                    for (i in 1:length(X)){
                      new_basis[i] = X[i] + d[i] 
                      if (new_basis[i] > upper_border[i]){
                        new_basis[i] = upper_border[i]
                      }
                      new_val = func_to_optimize(new_basis)
                      if (new_val < new_cur_min){
                        new_cur_min = new_val
                      } else {
                        new_basis[i] = X[i] - d[i]
                        if (new_basis[i] < lower_border[i]){
                          new_basis[i] = lower_border[i]
                        }
                        new_val = func_to_optimize(new_basis)
                        if (new_val < new_cur_min){
                          new_cur_min = new_val
                        } else {
                          new_basis[i] = X[i] 
                        }
                      }
                    }
                    if (new_cur_min < cur_min){
                      X = new_basis + l*(new_basis - cur_basis)
                      for (i in 1:length(X)){
                        if (X[i] > upper_border[i]){
                          X[i] = upper_border[i]
                        }
                        if (X[i] < lower_border[i]){
                          X[i] = lower_border[i]
                        }
                      }
                      cur_min = new_cur_min  
                      cur_basis = new_basis 
                      new_basis = X 
                      new_cur_min = func_to_optimize(new_basis)
                    } else {
                      X = cur_basis 
                      new_basis = cur_basis
                      new_cur_min = cur_min
                      is_over = TRUE
                      
                      d = d*(1+(a-1)*as.integer(d > e))
                      if (any(d > e)){
                        is_over = FALSE
                      }
                      #То что было.
                      for (i in 1:length(X)){ 
                        if (d[i] > e){
                          d[i] = a[i] * d[i]
                          is_over = FALSE
                        }
                      }
                      #То что стало.
                      d = d*(1+(a-1)*as.integer(d > e))
                      if (any(d > e)){
                        is_over = FALSE
                      }

                      if(is_over){
                        break
                      }
                    }
                  }
                  return(list(solution = cur_basis, value = cur_min))
                },
                optim = function(continuous, discrete, point){
                  if (!is.null(point)){
                    private$point <- point
                  }
                  Pdiscrete = NULL
                  if (private$func$get_dim()$discrete != 0){
                    Pdiscrete <- private$func$get_Pdiscrete()$default
                  }
                  fitness = function(x){y = private$func$get_fitness()(x,Pdiscrete);return(-y)}
                  res <- private$hj(func_to_optimize = fitness,
                             X = private$point,
                             d = continuous[1 : private$dim],
                             a = continuous[(private$dim+1) : (2*private$dim)], 
                             l = continuous[(2*private$dim+1)],
                             e = 10^-discrete[1],
                             lower_border = private$func$get_Pcontinuous()$lower,
                             upper_border = private$func$get_Pcontinuous()$upper,
                             max_iter = private$N/private$dim)
                  result = list(pos = list(continuous = as.numeric(res$solution), discrete = Pdiscrete), value = res$value)
                  return(result)
                }
              )
)
