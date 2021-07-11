# visual-replay
![xviz](https://user-images.githubusercontent.com/19968677/123816955-5605b300-d92a-11eb-9fc7-86e9d4fc9d40.gif)

frontend和server是基于仿真数据的回放，由于仿真数据中没有激光雷达数据，并且acceleration,velocity,wheel错误，  
导致无法看到激光雷达，并且acceleration,velocity,wheel显示有问题。  
使用的主要技术xviz，websocket，react，egg.js  
启动server，在根目录执行以下命令  
cd server  
yarn  
yarn dev  

启动frontend，在根目录执行以下命令  
cd frontend  
yarn  
yarn start  

录制的视频，由于上传文件大小限制，只录制了40s。  
https://user-images.githubusercontent.com/19968677/122677337-88b9f800-d214-11eb-82f0-0260bdb64bf3.mp4

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

即可看到kitti数据的回放，录制的视频超过10MB，github无法上传，可以去xviz官网查看。
地址，https://avs.auto/demo/index.html

