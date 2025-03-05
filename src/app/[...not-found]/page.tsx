import { permanentRedirect } from 'next/navigation';

export default function NotFoundPage() {
    return permanentRedirect('/');
}
