if(process.env.NODE_ENV==='production'){
    module.exports={
        URI:'mongodb://aungthu:aungthu@ds247678.mlab.com:47678/nuratech'
    }
}
else{
    module.exports={
        URI:'mongodb://localhost:27017/nuratechDB'
    }
}