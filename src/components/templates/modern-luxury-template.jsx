"use client";

const ModernLuxuryTemplate = ({ data, options, uploadedImages }) => {
  const { property_features, property_type_info, contact_info } = data;

  // Apply customization options
  const getBorderRadius = () => {
    switch (options.borderRadius) {
      case "none":
        return "0px";
      case "small":
        return "4px";
      case "medium":
        return "8px";
      case "large":
        return "16px";
      default:
        return "8px";
    }
  };

  const getFontSize = (base) => {
    switch (options.fontSize) {
      case "small":
        return `${base * 0.85}px`;
      case "medium":
        return `${base}px`;
      case "large":
        return `${base * 1.15}px`;
      default:
        return `${base}px`;
    }
  };

  // Generate images based on uploaded images or fallback to placeholders
  const generateImages = () => {
    const images = [];
    const uploadedKeys = Object.keys(uploadedImages);

    // If we have uploaded images, use them
    if (uploadedKeys.length > 0) {
      uploadedKeys.slice(0, options.maxImages).forEach((key) => {
        images.push({ src: uploadedImages[key], alt: key });
      });
    } else {
      // Fallback to placeholders if no images were uploaded
      const { image_requirements } = data;
      let count = 0;

      if (image_requirements.Exterior && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Exterior",
        });
        count++;
      }

      if (image_requirements["Living room"] && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Living Room",
        });
        count++;
      }

      if (image_requirements.Kitchen && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Kitchen",
        });
        count++;
      }

      if (image_requirements.Bedrooms && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Bedroom",
        });
        count++;
      }

      // Fill remaining slots with other features
      if (
        count < options.maxImages &&
        image_requirements["Other features needing images"]?.length > 0
      ) {
        for (const feature of image_requirements[
          "Other features needing images"
        ]) {
          if (count >= options.maxImages) break;
          images.push({
            src: "/placeholder.svg?height=300&width=400",
            alt: feature,
          });
          count++;
        }
      }
    }

    return images;
  };

  const images = generateImages();

  return (
    <div
      style={{
        fontFamily: options.fontFamily,
        backgroundColor: options.backgroundColor,
        color: "#333",
      }}
      className="flex flex-col h-full"
    >
      {/* Header with property type and price */}
      <div
        style={{
          backgroundColor: options.primaryColor,
          color: "white",
          padding: "1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: getFontSize(28),
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          {property_features["Property type"]}
        </h1>

        {options.showPrice && (
          <div
            style={{
              fontSize: getFontSize(24),
              fontWeight: "bold",
            }}
          >
            {property_features.Price}
          </div>
        )}

        <div
          style={{
            fontSize: getFontSize(16),
            marginTop: "0.5rem",
          }}
        >
          {property_features.Address}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Image gallery */}
        <div
          className="grid grid-cols-2 gap-4 mb-6"
          style={{
            borderRadius: getBorderRadius(),
            overflow: "hidden",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden"
              style={{ borderRadius: getBorderRadius() }}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Property highlights */}
        <div
          className="grid grid-cols-3 gap-4 mb-6"
          style={{
            color: options.secondaryColor,
            fontWeight: "bold",
            fontSize: getFontSize(18),
          }}
        >
          <div className="text-center">
            <div style={{ fontSize: getFontSize(24) }}>
              {property_features["Number of bedrooms"]}
            </div>
            <div>Bedrooms</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: getFontSize(24) }}>
              {property_features["Number of bathrooms"]}
            </div>
            <div>Bathrooms</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: getFontSize(24) }}>
              {property_features["Square footage"]}
            </div>
            <div>Sq Ft</div>
          </div>
        </div>

        {/* Property description */}
        <div className="mb-6" style={{ fontSize: getFontSize(16) }}>
          <h2
            style={{
              fontSize: getFontSize(20),
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: options.primaryColor,
            }}
          >
            Property Description
          </h2>
          <p>{property_type_info.property_description}</p>
        </div>

        {/* Key features */}
        <div className="mb-6" style={{ fontSize: getFontSize(16) }}>
          <h2
            style={{
              fontSize: getFontSize(20),
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: options.primaryColor,
            }}
          >
            Key Features
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {property_features.Amenities &&
              property_features.Amenities.slice(0, 6).map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className="mr-2 text-xs"
                    style={{ color: options.secondaryColor }}
                  >
                    ●
                  </span>
                  {amenity}
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Footer with contact info */}
      {options.showContact && (
        <div
          style={{
            backgroundColor: options.secondaryColor,
            color: "white",
            padding: "1rem",
            fontSize: getFontSize(14),
          }}
          className="flex justify-between items-center"
        >
          <div>
            <div style={{ fontWeight: "bold" }}>
              {contact_info["Real estate company name"]}
            </div>
            <div>{contact_info["Contact person's name"]}</div>
          </div>
          <div className="text-right">
            <div>{contact_info["Phone number"]}</div>
            <div>{contact_info["Email address"]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernLuxuryTemplate;
