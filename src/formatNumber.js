export const formatNumber= (importe) =>{

	if (typeof importe === 'object' && importe.$$typeof === Symbol.for('react.element')) {
        // If importe is a React element, extract the value from props.children
        importe = importe.props.children;
    }
    
		   
		return ((Number(importe)).toLocaleString('en-US', {
		  style: 'currency',
		  currency: 'USD',}));
		
}

export default formatNumber;