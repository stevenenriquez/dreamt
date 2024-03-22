export const storeImages = async (images) => {
try {
    // Just for temporary testing, remove this later
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };
    
    const storedImages = await Promise.all(
    images.map(async (imgUri, index) => {
        const imgName = `dream-${getRandomInt(10000)}-image-${index}.jpg`;
        const imgInfo = await FileSystem.getInfoAsync(imgUri);
        if (imgInfo.exists && imgInfo.isDirectory === false) {
        await FileSystem.copyAsync({
            from: imgUri,
            to: `${FileSystem.documentDirectory}${imgName}`
        });
        }
        return `${FileSystem.documentDirectory}${imgName}`;
    })
    );
    return storedImages;
} catch (error) {
    console.error('Error storing images: ', error);
}
};