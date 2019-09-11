export const SETFINGERDATA = 'SETFINGERDATA';


export function setFingerdata(fingerdata)
{
    return (dispatch) => {
        dispatch({
            type   : SETFINGERDATA,
            payload: fingerdata
        })
    }
}