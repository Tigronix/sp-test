const onlyNumbers = () => {
  const fields = document.querySelectorAll('.js-only-numbers');

  fields.forEach((field) => {
    field.addEventListener('input', (event) => {
      const valueLength = field.value.length;
      
      if(valueLength >= 4){
        const value = field.value;
        
      }
    })
  });
};