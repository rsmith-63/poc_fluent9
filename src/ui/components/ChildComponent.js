
import { Dropdown, Option } from "@fluentui/react-components";

export const ChildComponent = (props) => {
  const options1 = ["option1", "option2", "option3"];
  const options2 = ["option4", "option5", "option6"];
  return (
    <>
      <Dropdown
        aria-labelledby={"dropdownId"}
        placeholder="Select Observation"
        selectedOptions={props.value?.ob?.selectedOptions}
        value={props.value?.ob?.optionText}
        onOptionSelect={(event, option) => props.fun("ob", props.index, option)}
      >
        {options1.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Dropdown>
      <Dropdown
        aria-labelledby={"dropdownId"}
        placeholder="Select component"
        selectedOptions={props.value?.cat?.selectedOptions}
        value={props.value?.cat?.optionText}
        onOptionSelect={(event, option) =>
          props.fun("cat", props.index, option)
        }
      >
        {options2.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Dropdown>
    </>
  );
};
