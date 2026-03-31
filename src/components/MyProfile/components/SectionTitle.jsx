import { st } from "../constants/styles";

const SectionTitle = ({ title, subtitle }) => (
    <>
        <p style={st.sectionTitle}>{title}</p>
        {subtitle && <p style={st.sectionSubtitle}>{subtitle}</p>}
    </>
);

export default SectionTitle;