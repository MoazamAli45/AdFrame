"use client";

const BoldContemporaryTemplate = ({ data, options, uploadedImages }) => {
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

      if (image_requirements.Bathrooms && count < options.maxImages) {
        images.push({
          src: "/placeholder.svg?height=300&width=400",
          alt: "Bathroom",
        });
        count++;
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Bold header with diagonal design */}
      <div
        style={{
          position: "relative",
          height: "200px",
          overflow: "hidden",
          backgroundColor: options.primaryColor,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${options.primaryColor} 0%, ${options.primaryColor} 50%, ${options.secondaryColor} 50%, ${options.secondaryColor} 100%)`,
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            padding: "2rem",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: getFontSize(32),
              fontWeight: "bold",
              color: "white",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            {property_features["Property type"]}
          </h1>

          {options.showPrice && (
            <div
              style={{
                fontSize: getFontSize(28),
                fontWeight: "bold",
                color: "white",
              }}
            >
              {property_features.Price}
            </div>
          )}

          <div
            style={{
              fontSize: getFontSize(16),
              color: "white",
              opacity: 0.9,
              marginTop: "0.5rem",
            }}
          >
            {property_features.Address}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Property highlights in bold boxes */}
        <div className="grid grid-cols-3 gap-4 mb-6 -mt-12 relative z-10">
          <div
            style={{
              backgroundColor: options.secondaryColor,
              color: "white",
              padding: "1rem",
              borderRadius: getBorderRadius(),
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: getFontSize(24), fontWeight: "bold" }}>
              {property_features["Number of bedrooms"]}
            </div>
            <div style={{ fontSize: getFontSize(14) }}>BEDROOMS</div>
          </div>

          <div
            style={{
              backgroundColor: options.secondaryColor,
              color: "white",
              padding: "1rem",
              borderRadius: getBorderRadius(),
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: getFontSize(24), fontWeight: "bold" }}>
              {property_features["Number of bathrooms"]}
            </div>
            <div style={{ fontSize: getFontSize(14) }}>BATHROOMS</div>
          </div>

          <div
            style={{
              backgroundColor: options.secondaryColor,
              color: "white",
              padding: "1rem",
              borderRadius: getBorderRadius(),
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: getFontSize(24), fontWeight: "bold" }}>
              {property_features["Square footage"]}
            </div>
            <div style={{ fontSize: getFontSize(14) }}>SQ FT</div>
          </div>
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                borderRadius: getBorderRadius(),
                overflow: "hidden",
                border: `2px solid ${options.primaryColor}`,
              }}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Property description */}
        <div
          style={{
            backgroundColor: "#f8f8f8",
            padding: "1.5rem",
            borderRadius: getBorderRadius(),
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: getFontSize(20),
              fontWeight: "bold",
              marginBottom: "0.75rem",
              color: options.primaryColor,
              textTransform: "uppercase",
            }}
          >
            About This Property
          </h2>

          <p style={{ fontSize: getFontSize(16), lineHeight: 1.6 }}>
            {property_type_info.property_description}
          </p>
        </div>

        {/* Key features in a grid */}
        <div>
          <h2
            style={{
              fontSize: getFontSize(20),
              fontWeight: "bold",
              marginBottom: "0.75rem",
              color: options.primaryColor,
              textTransform: "uppercase",
            }}
          >
            Key Features
          </h2>

          <div
            className="grid grid-cols-2 gap-2"
            style={{ fontSize: getFontSize(14) }}
          >
            {property_features.Amenities &&
              property_features.Amenities.slice(0, 8).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center"
                  style={{
                    padding: "0.5rem",
                    backgroundColor:
                      index % 2 === 0 ? "#f8f8f8" : "transparent",
                    borderRadius: getBorderRadius(),
                  }}
                >
                  <span
                    className="mr-2 text-lg"
                    style={{ color: options.secondaryColor }}
                  >
                    ✓
                  </span>
                  {amenity}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer with contact info */}
      {options.showContact && (
        <div
          style={{
            backgroundColor: options.primaryColor,
            color: "white",
            padding: "1.5rem",
            fontSize: getFontSize(16),
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div style={{ fontWeight: "bold", fontSize: getFontSize(18) }}>
                {contact_info["Real estate company name"]}
              </div>
              <div>{contact_info["Contact person's name"]}</div>
            </div>
            <div className="text-right">
              <div style={{ fontWeight: "bold" }}>
                {contact_info["Phone number"]}
              </div>
              <div>{contact_info["Email address"]}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoldContemporaryTemplate;
