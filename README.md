# visual-replay

启动demoserver，在根目录执行以下命令  
cd demoserver  
yarn  
yarn startKitti  

启动demofrontend，在根目录执行以下命令  
cd demofrontend  
yarn  
cd examples/get-started  
yarn  
yarn start-streaming-local  

即可看到kitti数据的回放  

frontend和server是基于仿真数据的回放查看，  
由于仿真数据中的acceleration,velocity,wheel错误，  
导致acceleration,velocity,wheel显示有问题。  
启动server，在根目录执行以下命令  
cd server  
yarn  
yarn dev  

启动frontend，在根目录执行以下命令  
cd frontend  
yarn  
yarn start  