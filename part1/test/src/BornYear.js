
// Funciones auxiliares del componente y desestructuracion

// Esta parte de codigo 
/* 
const BornYear = (props) => {
    const { born, name } = props;
     */
// se puede resumir asi:
// const BornYear = ({ born, name }) => {

const BornYear = (props) => {
    const { born, name } = props;
    const calculateBornYear = () => new Date().getFullYear() - born;
    return (
        <div>
            {name}, you born in {calculateBornYear()}
        </div> 
    )
}

export default BornYear; 