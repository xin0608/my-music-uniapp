
let baseUrl = '';


baseUrl = __wxConfig.envVersion == "release" ? 'https://service-fxwkrjwo-1320882585.gz.apigw.tencentcs.com/release/' : 
'https://service-rnbfhwvg-1320882585.gz.apigw.tencentcs.com/release/'



export {
	baseUrl
}