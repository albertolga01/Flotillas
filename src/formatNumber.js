export const formatNumber= (importe) =>{
    
		   
		return ((Number(importe)).toLocaleString('en-US', {
		  style: 'currency',
		  currency: 'USD',}));
		
}

export default formatNumber;