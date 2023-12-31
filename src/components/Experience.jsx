import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';

import { useEffect, useState } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';

import axios from 'axios';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
	const [experiences, setExperiences] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const { data } = await axios.get('http://localhost:5000/api/portfolio/experiences');

				// console.log(data); // Imprime los datos en la consola
				setExperiences(data);

				// Agregar un retraso artificial de 2 segundos
				setTimeout(() => {
					setIsLoading(false);
				}, 10000);
			} catch (err) {
				console.log(err.message);
				// throw new Error(`Error al realizar la solicitud: ${err.message}`);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// console.log(experiences); // Imprime el estado "services" en la consola

	return (
		<>
			{isLoading ? (
				<div className="center-progress">
					<FidgetSpinner
						visible={true}
						height="80"
						width="80"
						ariaLabel="dna-loading"
						wrapperStyle={{}}
						wrapperClass="dna-wrapper"
						ballColors={['#00cea8', '#00cea8', '#00cea8']}
						backgroundColor="#fafbfd"
					/>
				</div>
			) : (
				<>
					<motion.div variants={textVariant()}>
						<p className={`${styles.sectionSubText} text-center`}>¿Qué hice hasta ahora?</p>
						<h2 className={`${styles.sectionHeadText} text-center`}>Experiencia practica</h2>
					</motion.div>

					<div className="mt-20 flex flex-col">
						<VerticalTimeline>
							{experiences.map((experience, index) => (
								<ExperienceCard key={`experience-${index}`} experience={experience} />
							))}
						</VerticalTimeline>
					</div>
				</>
			)}
		</>
	);
};

export default SectionWrapper(Experience, 'work');
