import Model from "./model";

class Dog extends Model {
    constructor(rawBreed) {
        super();

        this.name = rawBreed[0];
        this.subBreeds = rawBreed[1];
        this.image='null';
        this.moreImages='null';
        this.getImage();
        this.getMoreImages();
    }

    getImage(){
        this.api.getDogImage(this.name).then(response => {
            this.image = response.data.message;
        });
    }
    getMoreImages(){
        this.api.getMoreDogImages(this.name).then(response => {
            this.moreImages= response.data.message;
        });
    }
}

export default Dog;