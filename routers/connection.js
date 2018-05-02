/* option = {
    socketTimeoutMS: 300000000000000000,
    keepAlive: true,
    reconnectTries: 300000000000000000
};

 mongoose.connect("mongodb://localhost:27017/nodewebappdb",option); */
 /* mongoose.connect("mongodb://wpzqc4Bh2810pMJm:3tAewH9gV5heMYZP@localhost:53306/98f90265",option); */
	
mongoose.connect("mongodb://wpzqc4Bh2810pMJm:3tAewH9gV5heMYZP@kubernetes-service-node.service.consul:39586/98f90265?replicaSet=rs_98f90265-0e65-4c59-a532-32c2824eda6c");


connectionOne = mongoose.connection;
module.exports = connectionOne;

