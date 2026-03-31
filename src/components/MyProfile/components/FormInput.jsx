import { st } from "../constants/styles";

const FormInput = ({ label, type = "text", defaultValue, options, readOnly, inputRef }) => (
    <div className="col-sm-6">
        <label style={st.inputLabel}>{label}</label>

        {type === "select" ? (
            <select style={st.input} defaultValue={defaultValue}>
                {options.map(o => <option key={o}>{o}</option>)}
            </select>
        ) : (
            <input
                style={{ ...st.input, ...(readOnly && { background: "#f9f9f9" }) }}
                type={type}
                defaultValue={defaultValue}
                readOnly={readOnly}
                ref={inputRef}
            />
        )}
    </div>
);

export default FormInput;