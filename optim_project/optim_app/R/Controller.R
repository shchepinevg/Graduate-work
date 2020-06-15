get_default_N_pop = function(dim,N){
  if (trunc(sqrt(N/2)) >= 10*dim){
    return(trunc(sqrt(N/2)))
  } else {
    return(10*dim)
  }
}
Controller = function(str1,str2,path,param_func){
  Meta_mas = list(id = NULL,num = NULL,param = NULL,func = NULL)
  #���� ����������� �����
  str1 = strsplit(str1," ")[[1]]
  if (as.numeric(str1[1]) == 1){ #����� ����������� ��
    Meta_mas$id[1] = str1[2]  #������ id ��
    Meta_mas$num[1] = as.numeric(str1[3]) #������ ��������� N ��� ��
    minimization = as.numeric(str1[4])
  } else if (as.numeric(str1[1]) == 2){ #����� ����������� ���������� ��
    Meta_mas$id[1] = str1[2]  #������ id ��
    Meta_mas$id[2] = str1[3]  #������ id ����-��
    Meta_mas$num[1] = as.numeric(str1[4]) #������ ��������� N ��� ��
    Meta_mas$num[2] = as.numeric(str1[5]) #������ ��������� N ��� ����-��
    Meta_mas$num[3] = as.numeric(str1[6]) #������ ��������� k ��� ����-�������
    minimization = as.numeric(str1[7])
  }
  y <<- Meta_mas
  str2 = as.numeric(strsplit(str2," ")[[1]])
  if (str2[1] == 2){ #����� ������������� ���������������� ����������
    Meta_mas$param = str2[-1]
  }
  if (minimization == 1){
    minimization == TRUE
  } else {
    minimization == FALSE
  }
  
  #���� ������� ��������������� ������
  source("R\\Func.R")
  source("R\\Optim.R")
  # Meta_mas$func$id = "Schwefel"
  # Meta_mas$func$dim = 2
  if (!is.null(Meta_mas$func$id)){#������������ ���������� ��
    f_class = (source(paste0("R\\StandartFunction\\",Meta_mas$func$id,".R")))$value
    f = f_class$new(Meta_mas$func$dim)
  } else {                        #������������ ���������������� �������
    source("R\\CustomFunc.R")
    f = CustomFunc$new(path,param_func,minimization)
  }
  if (length(Meta_mas$id) == 1){#����� ������: ���������� ���������� �������
    op_class = source(paste0("R\\Optim\\",Meta_mas$id[1],".R"))$value
    op_final = op_class$new(Meta_mas$num[1],f)
  } else {                      #����� ������: ���������� ����������� ���������� ��
    source("R\\MFunc.R")
    op_class1 = source(paste0("R\\Optim\\",Meta_mas$id[1],".R"))$value
    op_class2 = source(paste0("R\\Optim\\",Meta_mas$id[2],".R"))$value
    op1 = op_class1$new(Meta_mas$num[1],f)
    meta_f = MFunc$new(op1,Meta_mas$num[3])
    op_final = op_class2$new(Meta_mas$num[2],meta_f)
  }
  if (is.null(Meta_mas$param)){#��������������� �������� ��
    result = op_final$run_default()
  } else {                     #���������������� �������� ��
    continuous = Meta_mas$param[1:op_final$get_dim()$continuous]
    discrete =  Meta_mas$param[(op_final$get_dim()$continuous+1):length(Meta_mas$param)]
    result = op_final$run(continuous,discrete)
  }
  result = c(result$pos, result$value)
  result = paste0(result,collapse = " ")
  return(result)
}

main = function() {
  args <- commandArgs(trailingOnly = T)
  params <- strsplit(args[4], " ")[[1]]
  matr <- matrix(params, ncol=4, byrow=T)
  str4 <- list()
  for (i in 1:nrow(matr)) {
    str4[[i]] <- matr[i,]
  }

  Controller(args[1], args[2], args[3], str4)
}

main()
