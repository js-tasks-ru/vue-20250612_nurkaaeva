import {computed, defineComponent, ref, watch} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0)
    const secondOperand = ref(0)
    const operator = ref("sum");

    const result = computed(()=>{
      const a = firstOperand.value
      const b = secondOperand.value
       return operator.value === "sum"
        ? a + b
        : operator.value === "subtract"
          ? a - b
          : operator.value === "multiply"
            ? a * b
            : a / b
    })
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
