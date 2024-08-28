


export const useFetchQuerry=(passedQueery:any)=>{
    const {data,error} = passedQueery() 

    return {
        data,error
    }
}