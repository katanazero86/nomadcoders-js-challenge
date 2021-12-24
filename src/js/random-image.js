const API_BASE_URL = `https://picsum.photos`;
const IMAGE_SIZE = 2048;

export default {
    getRandomImage() {
        return fetch(`${API_BASE_URL}/${IMAGE_SIZE}`, {
            method: 'get',
            cache: 'no-cache'
        });
    }
}