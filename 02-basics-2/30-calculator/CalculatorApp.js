import {defineComponent, ref, watch} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const result = ref(0)
    const firstOperand = ref(0)
    const secondOperand = ref(0)
    const operator = ref("sum");
    function calculate(){
      return operator.value === "sum"
        ? sum(firstOperand.value,secondOperand.value)
        : operator.value === "subtract"
          ? subtract(firstOperand.value,secondOperand.value)
          : operator.value === "multiply"
            ? multiply(firstOperand.value,secondOperand.value)
            : divide(firstOperand.value,secondOperand.value)
    }

    calculate()
    function sum(a, b) {
      result.value = a + b
      return result
    }

    function subtract(a, b) {
      result.value = a - b
      return result
    }

    function multiply(a, b) {
      result.value = a * b
      return result
    }

    function divide(a, b) {
      result.value = a / b
      return result
    }

    watch(firstOperand, ()=>{
      calculate()
    })
    watch(secondOperand, ()=>{
      calculate()
    })
    watch(operator, () => {
      calculate()
    });
    return {
      result,
      firstOperand,
      secondOperand,
      operator,
    }
  },

  template: `
    <div class="calculator">
      <input v-model="firstOperand" type="number" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input v-model="operator" type="radio" name="operator" value="sum"/>➕</label>
        <label><input v-model="operator" type="radio" name="operator" value="subtract"/>➖</label>
        <label><input v-model="operator" type="radio" name="operator" value="multiply"/>✖</label>
        <label><input v-model="operator" type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input v-model="secondOperand" type="number" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
