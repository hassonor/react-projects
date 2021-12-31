import css from "./Hours.module.css";

function Hours(): JSX.Element {
    return (
        <div className={css.Hours + " Box"}>
			<p className={css.CoolText}>
                Opening Hours: 07:00 AM - 09:00 PM
            </p>
        </div>
    );
}

export default Hours;
