import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '@fortawesome/fontawesome-svg-core/styles.css'
import {faPhone, faGlobe} from '@fortawesome/free-solid-svg-icons'
import {faTelegram, faWhatsapp, faVk} from '@fortawesome/free-brands-svg-icons'



export default function Contact({ contact }) {
	if (!['contact_phone_number', 'tg', 'vk', 'whats_app'].includes(contact.name) || contact.value === null)
		return <></>

	const byType = {
		contact_phone_number: faPhone,
		tg: faTelegram,
		vk: faVk,
		whats_app: faWhatsapp
	}

	const getHref = (value) => {
		switch (contact.name) {
            case 'contact_phone_number':
                return `tel:${value}`
            default:
                return value;
        }
	}

	return <div>
		<Link href={getHref(contact.value)} className="text-2xl">
			<FontAwesomeIcon icon={byType[contact.name]}></FontAwesomeIcon>
		</Link>
	</div>
}

