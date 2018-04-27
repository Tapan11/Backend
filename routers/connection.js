/*  option = {
    socketTimeoutMS: 300000000000000000,
    keepAlive: true,
    reconnectTries: 300000000000000000
};

 mongoose.connect("mongodb://localhost:27017/nodewebappdb",option); */
 /* mongoose.connect("mongodb://dVSshiNvIdCrnI4v:nLVLFGY0SO2YYlXm@localhost:53306/98f90265",option); */
	
mongoose.connect("mongodb://wpzqc4Bh2810pMJm:3tAewH9gV5heMYZP@kubernetes-service-node.service.consul:39586/98f90265?replicaSet=rs_98f90265-0e65-4c59-a532-32c2824eda6c");


connectionOne = mongoose.connection;
module.exports = connectionOne;





/* mongodb://2gj8g8gqPyzOv2l7:emfCzo53lXCNg0uG@kubernetes-service-node.service.consul:39586,


mongodb://2gj8g8gqPyzOv2l7:emfCzo53lXCNg0uG@localhost/98f90265?replicaSet=rs_98f90265-0e65-4c59-a532-32c2824eda6c


kubernetes-service-node.service.consul:49553,kubernetes-service-node.service.consul:43187/98f90265?replicaSet=rs_98f90265-0e65-4c59-a532-32c2824eda6c

mongodb://pdn7i5Jl6hpYEStS:Yv0LVmzV7uL1TM9P@kubernetes-service-node.service.consul:47522,kubernetes-service-node.service.consul:36054,kubernetes-service-node.service.consul:49379/9f205889 */
//pdn7i5Jl6hpYEStS:Yv0LVmzV7uL1TM9P@kubernetes-service-node.service.consul:47522,kubernetes-service-node.service.consul:36054,kubernetes-service-node.service.consul:49379/9f205889?replicaSet=rs_9f205889-915c-4601-9f19-dfc9cd968e5a