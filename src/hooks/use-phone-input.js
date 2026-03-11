import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/auth-provider';

export function usePhoneInput() {
	const { user } = useAuthContext();
	const [phone, setPhone] = useState('');

	// Normalizes phone to 07XXXXXXXX
	const normalizeToLocal = (input) => {
		const raw = input.replace(/^\+/, '').replace(/\s+/g, '');

		if (raw.startsWith('254') && raw.length === 12) {
			return '0' + raw.slice(3);
		}

		if (raw.startsWith('07') && raw.length === 10) {
			return raw;
		}

		return null;
	};

	useEffect(() => {
		if (user?.phone) {
			const local = normalizeToLocal(user.phone);
			if (local) {
				const numeric = `254${local.slice(1)}`;
				setPhone(numeric);
			}
		}
	}, [user]);

	const getPhoneLocal = () => normalizeToLocal(phone);

	return {
		phone,
		setPhone,
		getPhoneLocal,
	};
}