import cl from './Modal.module.css'

const Modal = ({ children, isModal, setIsModal }) => {
	const rootClasses = [cl.myModal]
	if (isModal) {
		rootClasses.push(cl.active)
	}

	return (
		<div className={rootClasses.join(' ')} onClick={() => setIsModal(false)}>
			<div className={cl.myModalContent} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default Modal
