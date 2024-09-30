// scripts/generateArtworkMetadata.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Image manipulation library
const inquirer = require('inquirer').default; // For interactive CLI prompts

// Directory containing your images
const imagesDirectory = path.join(__dirname, '../public/images/metadataCorral');

// Artist and year constants
const artist = 'Aetheric Canvas';

// Function to convert title to PascalCase
const toPascalCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\s]+/g, ' ')
    .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .replace(/\s/g, '');
};

// Data for artwork metadata generation (5 styles, each with 5 titles and descriptions)
const styles = {
  Abstract: {
    titles: ['Eternal Symphony', 'Nebula Dreams', 'Mystic Realms', 'Veil of Silence', 'Echoes of Time'],
    descriptions: [
      'A vibrant exploration of boundless imagination.',
      'An abstract interpretation of cosmic energies.',
      'A mesmerizing journey into unknown realms.',
      'The quiet calm between the past and future.',
      'Resonances of forgotten memories and distant echoes.'
    ],
  },
  Realism: {
    titles: ['Whispers of the Past', 'Unyielding Truth', 'Fleeting Glimpse', 'Silent Watcher', 'Autumn Splendor'],
    descriptions: [
      'A detailed capture of fleeting beauty.',
      'A glimpse into nature’s perfect serenity.',
      'Quiet observation of life\'s details.',
      'Stunning rendition of reality at its finest.',
      'Vivid representation of seasonal beauty.'
    ],
  },
  Surrealism: {
    titles: ['Beyond the Veil', 'Mind’s Eye', 'Phantom of Time', 'Ethereal Journey', 'Parallel Realities'],
    descriptions: [
      'A world beyond the veil of reality.',
      'A journey through the mind’s eye.',
      'A phantom presence in the void of time.',
      'An ethereal journey through unknown spaces.',
      'Parallel realities collide and blend.'
    ],
  },
  Impressionism: {
    titles: ['Light and Shadow', 'Sunset Reverie', 'Fleeting Impression', 'Whisper of the Wind', 'Beneath the Surface'],
    descriptions: [
      'A play of light and shadow across the canvas.',
      'A peaceful sunset captured in fleeting strokes.',
      'A fleeting glimpse of the world in motion.',
      'The wind whispers through the trees.',
      'Beneath the surface lies hidden depth.'
    ],
  },
  Minimalism: {
    titles: ['Silent Spaces', 'Pure Essence', 'Less is More', 'Subtle Harmony', 'Simple Beauty'],
    descriptions: [
      'A calm and peaceful space, free of distractions.',
      'Capturing the essence of simplicity and form.',
      'An ode to the philosophy of less is more.',
      'Harmony achieved through simplicity.',
      'Beauty in its simplest and purest form.'
    ],
  }
};

// Function to generate unique titles and descriptions for artworks based on selected style
const generateArtworkMetadata = (styleCategory) => {
  const styleData = styles[styleCategory];

  // Randomly select a title and description from the chosen style
  const randomIndex = Math.floor(Math.random() * styleData.titles.length);
  const title = styleData.titles[randomIndex];
  const description = styleData.descriptions[randomIndex];

  // Generate PascalCase filename
  const pascalTitle = toPascalCase(title);

  return { title, description, style: styleCategory, pascalTitle };
};

// Function to save image with metadata using sharp
const saveImageWithMetadata = async (filePath, metadata) => {
  const { pascalTitle, title, description, style } = metadata;
  const newFilePath = path.join(path.dirname(filePath), `${pascalTitle}.png`);

  try {
    // Use sharp to load the image
    const image = sharp(filePath);

    // Save the image as PNG with metadata
    await image
      .png()
      .withMetadata({
        exif: {
          IFD0: {
            Artist: artist,
            Title: title,
            Description: description,
            Software: 'SharpJS',
            Copyright: artist,
            ImageDescription: description,
          },
        },
      })
      .toFile(newFilePath);

    console.log(`Image with metadata saved as ${newFilePath}`);
  } catch (error) {
    console.error(`Error saving image with metadata: ${error.message}`);
  }
};

// Interactive function to select image and style
const promptUserForImageAndStyle = async () => {
  try {
    // Get a list of files in the images directory
    const files = fs.readdirSync(imagesDirectory);

    // Prompt the user to choose a style and image
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'chosenStyle',
        message: 'Select the style category for your artwork:',
        choices: Object.keys(styles),
      },
      {
        type: 'list',
        name: 'chosenImage',
        message: 'Select the image you want to process:',
        choices: files,
      },
    ]);

    // Generate metadata based on user selection
    const { chosenStyle, chosenImage } = answers;
    const filePath = path.join(imagesDirectory, chosenImage);
    const metadata = generateArtworkMetadata(chosenStyle);

    // Save the image with the generated metadata
    await saveImageWithMetadata(filePath, metadata);

    console.log(`Metadata generated and image saved for ${chosenImage}`);
  } catch (error) {
    console.error(`Error during selection: ${error.message}`);
  }
};

// Run the prompt and process the selected image and style
promptUserForImageAndStyle();
