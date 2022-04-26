import App		from "../../fungi/App.js";
import EyeBall	from "./EyeBall.js";

const BONES = [
	{ "name":"Hips", "len":0.105, "idx":0,"p_idx":null,"pos":[0,1.039,0.020], "rot":[2.4268916831715615e-7,0,0,1]  },
	{ "name":"Spine", "len":0.097, "idx":1,"p_idx":0,"pos":[0,0.105,0], "rot":[-0.044645827263593674,-8.692448299794618e-27,-4.453656740259141e-20,0.9990028738975525]},

	{ "name":"Spine1", "len":0.093, "idx":2,"p_idx":1,"pos":[0,0.097,0], "rot":[-0.029409686103463173,-3.2960057599844583e-21,4.441442901526913e-20,0.999567449092865]},
	{ "name":"Spine2", "len":0.167, "idx":3,"p_idx":2,"pos":[0,0.093,0], "rot":[0.07400670647621155,3.6727628484210417e-28,9.542332680489529e-27,0.9972577691078186]},
	{ "name":"Neck", "len":0.053, "idx":4, "p_idx":3,"pos":[0,0.1656,-0.0251],"rot":[1.9075930168810373e-8,-1.1470830885815196e-34,-8.605402693567593e-35,1]},
	{ "name":"Head", "len":0.1, "idx":5, "p_idx":4,"pos":[0,0.053,0],"rot":[-1.3502827300726494e-8,-4.0840682940945415e-35,-6.660796967887298e-36,1]},

	{ "name":"LeftShoulder","len":0.108,"idx":6,"p_idx":3,  "pos":[0.045,0.1084,-0.026],"rot":[0.7071067690849304,0.7071067690849304,5.338507236274381e-8,-5.338507236274381e-8]},
	{ "name":"LeftArm","len":0.278,"idx":7,"p_idx":6,  "pos":[-0.005,0.105,-0.022],"rot":[-1.495118037678709e-35,-4.519952057080445e-8,1.1566897702458666e-34,1]},
	{ "name":"LeftForeArm","len":0.283,"idx":8,"p_idx":7,"pos":[0,0.278,0],"rot":[-6.706603130623989e-7,7.00962573318975e-7,0.0000016832213987072464,1]},
	{ "name":"LeftHand","len":0.039,"idx":9,"p_idx":8,"pos":[0,0.283,0],"rot":[-0.0000016157980553543894,0.000001614453026377305,-9.588043212716002e-7,1]},
	
	{ "name":"LeftHandThumb1","len":0.041,"idx":10,"p_idx":9,"pos":[-0.015,0.024,-0.026],"rot":[-0.22191810607910156,-0.059467192739248276,0.25190043449401855,0.9400862455368042]},
	{ "name":"LeftHandThumb2","len":0.034,"idx":11,"p_idx":10,"pos":[0,0.041,0],"rot":[-0.000019305929527035914,0.00003363657015142962,-0.0000676217969157733,1]},
	{ "name":"LeftHandThumb3","len":0.03,"idx":12,"p_idx":11,"pos":[0,0.034,0],"rot":[0.011500630527734756,-0.0017704364145174623,0.0036687529645860195,0.9999255537986755]},
	{ "name":"LeftHandIndex1","len":0.036,"idx":13,"p_idx":9,"pos":[-0.0051,0.087,-0.035],"rot":[0.000002279914497194113,-0.0000023154120754043106,-7.219787789836118e-7,1]},
	{ "name":"LeftHandIndex2","len":0.028,"idx":14,"p_idx":13,"pos":[0,0.036,0],"rot":[-0.000005065046025265474,0.000005125999450683594,-2.465329940193328e-9,1]},
	{ "name":"LeftHandIndex3","len":0.02,"idx":15,"p_idx":14,"pos":[0,0.0288,0],"rot":[0.000014023946278030053,-0.00001409131618856918,-0.000004982239261153154,1]},
	{ "name":"LeftHandMiddle1","len":0.036,"idx":16,"p_idx":9,"pos":[0,0.094,-0.011],"rot":[0.0000022864619495521765,-0.0000023154120754043106,-7.244172479659028e-7,1]},
	{ "name":"LeftHandMiddle2","len":0.029,"idx":17,"p_idx":16,"pos":[0,0.036,0],"rot":[-0.0000030297826469904976,0.000003099441300946637,-9.861094579788343e-12,1]},
	{ "name":"LeftHandMiddle3","len":0.02,"idx":18,"p_idx":17,"pos":[0,0.029,0],"rot":[1.3773330920230364e-7,-1.8769137000163028e-7,0.000008413082468905486,1]},
	{ "name":"LeftHandRing1","len":0.031,"idx":19,"p_idx":9,"pos":[-0.0004,0.091,0.0137],"rot":[0.0000022736619484930998,-0.0000023154120754043106,-7.243664867928601e-7,1]},
	{ "name":"LeftHandRing2","len":0.029,"idx":20,"p_idx":19,"pos":[0,0.031,0],"rot":[-0.0000017625555983613594,0.000001788139229574881,-5.4141510719141195e-11,1]},
	{ "name":"LeftHandRing3","len":0.02,"idx":21,"p_idx":20,"pos":[0,0.029,0],"rot":[0.0000031824711186345667,-0.000003104724555669236,0.000009005581887322478,1]},
	{ "name":"LeftHandPinky1","len":0.036,"idx":22,"p_idx":9,"pos":[-0.0048,0.0807,0.0373],"rot":[0.0000022765411813452374,-0.0000023154120754043106,-7.243598361128534e-7,1]},
	{ "name":"LeftHandPinky2","len":0.021,"idx":23,"p_idx":22,"pos":[0,0.036,0],"rot":[0.000006353253411361948,-0.000006276305157371098,0.000002819155724864686,1]},
	{ "name":"LeftHandPinky3","len":0.02,"idx":24,"p_idx":23,"pos":[0,0.021,0],"rot":[-0.000005777703790954547,0.000005574775059358217,-0.000008853048711898737,1]},
	
	{ "name":"RightShoulder","len":0.108,"idx":25,"p_idx":3,"pos":[-0.045,0.1084,-0.026],"rot":[1.0185958743136325e-8,-1.0185956966779486e-8,0.7071067690849304,0.7071067690849304]},
	{ "name":"RightArm","len":0.278,"idx":26,"p_idx":25,"pos":[-0.005,0.105,0.022],"rot":[3.736904002898115e-35,-1.006445394960507e-15,-5.495755792415194e-35,1]},
	{ "name":"RightForeArm","len":0.283,"idx":27,"p_idx":26,"pos":[0,0.278,0],"rot":[2.1040301589891897e-7,-2.0325643390606274e-7,6.31208195045474e-7,1]},
	{ "name":"RightHand","len":0.039,"idx":28,"p_idx":27,"pos":[0,0.283,0],"rot":[0.000003163138671880006,-0.000003194210648871376,-6.312201321634348e-7,1]},
	
	{ "name":"RightHandPinky1","len":0.036,"idx":29,"p_idx":28,"pos":[-0.0048,0.0807,-0.0373],"rot":[-0.0000033630744837864768,0.0000033974647521972656,-1.1425927912145362e-11,1]},
	{ "name":"RightHandPinky2","len":0.021,"idx":30,"p_idx":29,"pos":[0,0.036,0],"rot":[0.000011971213098149747,-0.000011956633898080327,-0.0000056385929383395705,1]},
	{ "name":"RightHandPinky3","len":0.1,"idx":31,"p_idx":30,"pos":[0,0.021,0],"rot":[-0.00000802205249783583,0.000008068487659329548,-3.9523754935544275e-7,1]},
	{ "name":"RightHandRing1","len":0.031,"idx":32,"p_idx":28,"pos":[-0.0004,0.091,-0.0137],"rot":[-0.000003366203372934251,0.000003397464979570941,-1.1436558297606148e-11,1]},
	{ "name":"RightHandRing2","len":0.029,"idx":33,"p_idx":32,"pos":[0,0.031,0],"rot":[0.000008235279892687686,-0.000008292319762404077,-0.000006086941539251711,1]},
	{ "name":"RightHandRing3","len":0.02,"idx":34,"p_idx":33,"pos":[0,0.029,0],"rot":[-0.000015700450603617355,0.00001574820271343924,0.000015092553439899348,1]},
	{ "name":"RightHandMiddle1","len":0.036,"idx":35,"p_idx":28,"pos":[0,0.094,0.011],"rot":[-0.000003373543677298585,0.0000033974647521972656,1.1594199558762064e-11,1]},
	{ "name":"RightHandMiddle2","len":0.029,"idx":36,"p_idx":35,"pos":[0,0.036,0],"rot":[-0.000003787220066442387,0.0000038214084270293824,-0.000002019868361458066,1]},
	{ "name":"RightHandMiddle3","len":0.02,"idx":37,"p_idx":36,"pos":[0,0.029,0],"rot":[0.000003721492703334661,-0.0000037618035548803164,0.0000020198690435790922,1]},
	{ "name":"RightHandIndex1","len":0.036,"idx":38,"p_idx":28,"pos":[-0.0051,0.087,0.035],"rot":[-0.0000033692147098918213,0.0000033974647521972656,-1.1446789696667459e-11,1]},
	{ "name":"RightHandIndex2","len":0.028,"idx":39,"p_idx":38,"pos":[0,0.036,0],"rot":[0.000005616404450847767,-0.000005643691110890359,-0.0000020674101506301668,1]},
	{ "name":"RightHandIndex3","len":0.02,"idx":40,"p_idx":39,"pos":[0,0.0288,0],"rot":[0.000002786867753457045,-0.000002750003659457434,0.000012031735423079226,1]},
	{ "name":"RightHandThumb1","len":0.041,"idx":41,"p_idx":28,"pos":[-0.015,0.024,0.026],"rot":[0.22176654636859894,0.05947277694940567,0.25208544731140137,0.9400720596313477]},
	{ "name":"RightHandThumb2","len":0.034,"idx":42,"p_idx":41,"pos":[0,0.041,0],"rot":[0.00034027191577479243,-0.00019238849927205592,-0.0003856124822050333,0.9999998211860657]},
	{ "name":"RightHandThumb3","len":0.03,"idx":43,"p_idx":42,"pos":[0,0.034,0],"rot":[-0.011897333897650242,0.00195137073751539,0.004018437582999468,0.9999192357063293]},

	{ "name":"LeftUpLeg","len":0.443,"idx":44,"p_idx":0,"pos":[0.094,-0.067,-0.015],"rot":[-4.371138828673793e-8,0,1,3.406487686135706e-22]},
	{ "name":"LeftLeg","len":0.445,"idx":45,"p_idx":44,"pos":[0,0.443,0],"rot":[0.003196412930265069,0.0000028676147394435247,-1.5653178309094073e-8,0.9999948740005493]},
	{ "name":"LeftFoot","len":0.115,"idx":46,"p_idx":45,"pos":[0,0.445,0],"rot":[0.354154109954834,-0.0000027842902454722207,0.0000010277683486492606,0.935187041759491]},
	{ "name":"LeftToeBase","len":0.1,"idx":47,"p_idx":46,"pos":[0,0.115,0],"rot":[0.4079362452030182,1.7544498120969365e-7,-2.7185055984091377e-8,0.9130104184150696] },

	{ "name":"RightUpLeg","len":0.443,"idx":48,"p_idx":0,"pos":[-0.094,-0.067,-0.015],"rot":[-4.371138828673793e-8,0,1,3.406487686135706e-22]},
	{ "name":"RightLeg","len":0.445,"idx":49,"p_idx":48,"pos":[0,0.443,0],"rot":[0.003213413991034031,-0.000005006765604775865,-1.5807968267722572e-8,0.9999948143959045] },
	{ "name":"RightFoot","len":0.115,"idx":50,"p_idx":49,"pos":[0,0.445,0],"rot":[0.3540933132171631,0.000004626839199772803,-0.0000017285617559537059,0.935210108757019] },
	{ "name":"RightToeBase","len":0.1,"idx":51,"p_idx":50,"pos":[0,0.115,0],"rot":[0.4079799950122833,1.589943821045381e-7,-4.328248692786474e-8,0.9129908680915833] },
];

const CONFIG = [
	{"bone":"Hips", "base_opt":[1,0,1], "scl_top":[0.06,0.04,0.06], "scl_mid":[0.025,0,0.04], "scl_bot":[0.06,0.04,0.06], "pos_top":[0.03,0.09,0], "pos_mid":[0,0,0], "pos_bot":[0.03,-0.09,0], "base_pos":[0,0.01,-0.01], "base_rot":[0,0,0.707106769084934,0.707106769084934]},
	{"bone":"LeftUpLeg", "base_opt":[1,0,0], "scl_top":[0.03,0.03,0.03], "scl_mid":[0.01,0,0.01], "scl_bot":[0.03,0.04,0.03], "pos_top":[0,0.39,0], "pos_mid":[0,0.19,0.02], "pos_bot":[0,-0.02,0], "base_pos":[0,0.02,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftLeg", "base_opt":[1,-0.18,0], "scl_top":[0.03,0.03,0.03], "scl_mid":[0.01,0,0.01], "scl_bot":[0.03,0.03,0.03], "pos_top":[0,0.38,-0.01], "pos_mid":[0,0.29,0.01], "pos_bot":[0,-0.02,0], "base_pos":[0,0.05,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftFoot", "base_opt":[1,0,1], "scl_top":[0.04,0.05,0.03], "scl_mid":[0.04,0.02,0.04], "scl_bot":[0.05,0.05,0.04], "pos_top":[0,0.05,0], "pos_mid":[0,0,0.02], "pos_bot":[0,-0.02,0], "base_pos":[0,0.05,-0.03], "base_rot":[0.3420215547084883,0,0,0.939692616462775]},
	{"bone":"LeftToeBase", "base_opt":[0,0,1], "scl_top":[0.038,0.02,0.01], "scl_mid":[1,1,1], "scl_bot":[0.04,0.02,0.03], "pos_top":[0,0.05,0], "pos_mid":[0,0,0], "pos_bot":[0,0.02,0], "base_pos":[0,0.02,0.01], "base_rot":[-0.1218693453897858,0,0,0.9925461411476135]},

	{"bone":"RightUpLeg", "base_opt":[1,0,0], "scl_top":[0.03,0.03,0.03], "scl_mid":[0.01,0,0.01], "scl_bot":[0.03,0.04,0.03], "pos_top":[0,0.39,0], "pos_mid":[0,0.19,0.02], "pos_bot":[0,-0.02,0], "base_pos":[0,0.02,0], "base_rot":[0,0,0,1]},
	{"bone":"RightLeg", "base_opt":[1,-0.18,0], "scl_top":[0.03,0.03,0.03], "scl_mid":[0.01,0,0.01], "scl_bot":[0.03,0.03,0.03], "pos_top":[0,0.38,-0.01], "pos_mid":[0,0.29,0.01], "pos_bot":[0,-0.02,0], "base_pos":[0,0.05,0], "base_rot":[0,0,0,1]},
	{"bone":"RightFoot", "base_opt":[1,0,1], "scl_top":[0.04,0.05,0.03], "scl_mid":[0.04,0.02,0.04], "scl_bot":[0.05,0.05,0.04], "pos_top":[0,0.05,0], "pos_mid":[0,0,0.02], "pos_bot":[0,-0.02,0], "base_pos":[0,0.05,-0.03], "base_rot":[0.3420215547084883,0,0,0.939692616462775]},
	{"bone":"RightToeBase", "base_opt":[0,0,1], "scl_top":[0.038,0.02,0.01], "scl_mid":[1,1,1], "scl_bot":[0.04,0.02,0.03], "pos_top":[0,0.05,0], "pos_mid":[0,0,0], "pos_bot":[0,0.02,0], "base_pos":[0,0.02,0.01], "base_rot":[-0.1218693453897858,0,0,0.9925461411476135]},
	
	{"bone":"Spine", "base_opt":[0,0,1], "scl_top":[0.037,0.037,0.037], "scl_mid":[1,1,1], "scl_bot":[0.045,0.04,0.045], "pos_top":[0,0.033,0], "pos_mid":[0,0,0], "pos_bot":[0,0.02,0], "base_pos":[0,0.02,0], "base_rot":[0,0,0,1]},
	{"bone":"Spine1", "base_opt":[0,0,1], "scl_top":[0.041,0.04,0.05], "scl_mid":[1,1,1], "scl_bot":[0.037,0.037,0.044], "pos_top":[0,0.003,0], "pos_mid":[0,0,0], "pos_bot":[0,0.016,0], "base_pos":[0,0.05,0], "base_rot":[0,0,0,1]},
	{"bone":"Spine2", "base_opt":[1,0,0], "scl_top":[0.07,0.06,0.07], "scl_mid":[0.06,0.06,0.07], "scl_bot":[0.07,0.06,0.07], "pos_top":[-0.07,0.1000,0], "pos_mid":[0,0,0], "pos_bot":[-0.07,-0.1000,0], "base_pos":[0,0.11,0], "base_rot":[0,0,0.707106769084934,0.707106769084934]},
	{"bone":"Neck", "base_opt":[1,0,1], "scl_top":[0.019,0.019,0.019], "scl_mid":[0.01,0,0.007], "scl_bot":[0.016,0.016,0.016], "pos_top":[0,0.04,0.01], "pos_mid":[0,0,0], "pos_bot":[0,-0.04,0.015], "base_pos":[0,0,0], "base_rot":[0,0,0,1]},
	{"bone":"Head", "base_opt":[2.0000,0.23,1], "scl_top":[0.07,0.02,0.07], "scl_mid":[0.07,0,0.07], "scl_bot":[0.03,0.02,0.03], "pos_top":[0,0.09,0], "pos_mid":[0,0.01,0.04], "pos_bot":[0,-0.04,0.03], "base_pos":[0,0,0.01], "base_rot":[0,0,0,1]},

	{"bone":"LeftShoulder", "base_opt":[2.0000,0,1], "scl_top":[0.005,0.01,0.005], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.02,0.01], "pos_top":[-0.02,0.06,0], "pos_mid":[0.01,0,0], "pos_bot":[0,-0.03,0], "base_pos":[0.015,0.04,-0.02], "base_rot":[-0.04361938685178757,0,0,0.999048233322266]},
	{"bone":"LeftArm", "base_opt":[1,0,0], "scl_top":[0.025,0.025,0.025], "scl_mid":[0.01,0,0.01], "scl_bot":[0.03,0.03,0.03], "pos_top":[0,0.233,0], "pos_mid":[0,0.15,0], "pos_bot":[0,-0.02,0], "base_pos":[0,0.02,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftForeArm", "base_opt":[1,0,0], "scl_top":[0.018,0.02,0.018], "scl_mid":[0.009,0,0.009], "scl_bot":[0.023,0.023,0.023], "pos_top":[0,0.216,0], "pos_mid":[0,0.14,0], "pos_bot":[0,-0.02,0], "base_pos":[0,0.044,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHand", "base_opt":[0,0,1], "scl_top":[0.018,0.04,0.055], "scl_mid":[1,1,1], "scl_bot":[0.018,0.02,0.04], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,0.02,0], "base_pos":[0,0.04,0], "base_rot":[0,0,0,1]},

	{"bone":"LeftHandIndex1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandIndex2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandIndex3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"LeftHandMiddle1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandMiddle2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandMiddle3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"LeftHandRing1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandRing2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandRing3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"LeftHandPinky1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandPinky2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandPinky3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"LeftHandThumb1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandThumb2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"LeftHandThumb3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"RightShoulder", "base_opt":[2.0000,0,1], "scl_top":[0.005,0.01,0.005], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.02,0.01], "pos_top":[-0.02,0.06,0], "pos_mid":[0.01,0,0], "pos_bot":[0,-0.03,0], "base_pos":[0.015,0.04,0.02], "base_rot":[0.04361938685178757,0,0,0.999048233322266]},
	{"bone":"RightArm", "base_opt":[1,0,0], "scl_top":[0.025,0.025,0.025], "scl_mid":[0.01,0,0.01], "scl_bot":[0.03,0.03,0.03], "pos_top":[0,0.233,0], "pos_mid":[0,0.15,0], "pos_bot":[0,-0.02,0], "base_pos":[0,0.02,0], "base_rot":[0,0,0,1]},
	{"bone":"RightForeArm", "base_opt":[1,0,0], "scl_top":[0.018,0.02,0.018], "scl_mid":[0.009,0,0.009], "scl_bot":[0.023,0.023,0.023], "pos_top":[0,0.216,0], "pos_mid":[0,0.14,0], "pos_bot":[0,-0.02,0], "base_pos":[0,0.044,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHand", "base_opt":[0,0,1], "scl_top":[0.018,0.04,0.055], "scl_mid":[1,1,1], "scl_bot":[0.018,0.02,0.04], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,0.02,0], "base_pos":[0,0.04,0], "base_rot":[0,0,0,1]},

	{"bone":"RightHandIndex1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandIndex2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandIndex3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"RightHandMiddle1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandMiddle2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandMiddle3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"RightHandRing1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandRing2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandRing3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"RightHandPinky1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandPinky2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandPinky3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},

	{"bone":"RightHandThumb1", "base_opt":[1,0,0], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.01,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.01,0], "base_pos":[0,0.016,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandThumb2", "base_opt":[1,0,1], "scl_top":[0.01,0.01,0.01], "scl_mid":[0.008,0,0.008], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,-0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
	{"bone":"RightHandThumb3", "base_opt":[0,0,1], "scl_top":[0.008,0.008,0.008], "scl_mid":[0.01,0,0.02], "scl_bot":[0.01,0.01,0.01], "pos_top":[0,0.005,0], "pos_mid":[0,0,0], "pos_bot":[0,0.005,0], "base_pos":[0,0.015,0], "base_rot":[0,0,0,1]},
];

function ProtoEntity( name="ProtoHuman", inc_eye=false, use_preview=false ){
	let e = App.mesh_entity( name );

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// CREATE ARMATURE
	let arm = App.ecs.add_com( e.id, "Armature" );
	arm
		.load_config( BONES )
		.anchor_root_bones( e.node );

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// PROTOFORM
	let pro = App.ecs.add_com( e.id, "ProtoForm" );
	pro.use_armature( arm, CONFIG ); // pro.use_config( CONFIG );
	e.draw.add( pro.get_draw_item() );

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// BONE PREVIEW
	if( use_preview ){
		e.bview = App.ecs.add_com( e.id, "BoneView" );
		e.bview.use_armature( e.arm );
		e.draw.add( e.bview.get_draw_item() );
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// EYEBALL
	if( inc_eye ){
		let eye = EyeBall();
		//eye.node.set_scl( 0.21 ).set_pos( 0, 0.082, 0.02 );
		arm.attach_to_bone( "Head", eye.node );
		e.eye = eye;
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	e.proto	= pro;
	e.arm	= arm;
	return e;
}

export default ProtoEntity;