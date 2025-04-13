"use client";

const MinimalistTemplate = ({ data, options, uploadedImages }) => {
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
      // For minimalist template, we prioritize a single large image for the main display
      const mainImageKey =
        uploadedKeys.find(
          (key) =>
            key === "Exterior" || key === "Living Room" || uploadedKeys[0]
        ) || uploadedKeys[0];

      images.push({
        src: uploadedImages[mainImageKey],
        alt: mainImageKey,
        main: true,
      });

      // Add remaining images as secondary
      uploadedKeys
        .filter((key) => key !== mainImageKey)
        .slice(0, options.maxImages - 1)
        .forEach((key) => {
          images.push({ src: uploadedImages[key], alt: key });
        });
    } else {
      // Fallback to placeholders if no images were uploaded
      const { image_requirements } = data;
      let count = 0;

      // For minimalist template, we prioritize a single large image
      if (image_requirements.Exterior) {
        images.push({
          src: "/placeholder.svg?height=600&width=800",
          alt: "Exterior",
          main: true,
        });
        count++;
      } else if (image_requirements["Living room"]) {
        images.push({
          src: "/placeholder.svg?height=600&width=800",
          alt: "Living Room",
          main: true,
        });
        count++;
      }

      // Add secondary images
      if (count < options.maxImages) {
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
    }

    return images;
  };

  const images = generateImages();
  const mainImage = images.find((img) => img.main) || images[0];
  const secondaryImages = images
    .filter((img) => !img.main)
    .slice(0, options.maxImages - 1);

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
      {/* Minimalist header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1
              style={{
                fontSize: getFontSize(28),
                fontWeight: "bold",
                color: options.primaryColor,
                marginBottom: "0.25rem",
              }}
            >
              {property_features["Property type"]}
            </h1>
            <div style={{ fontSize: getFontSize(16) }}>
              {property_features.Address}
            </div>
          </div>

          {options.showPrice && (
            <div
              style={{
                fontSize: getFontSize(24),
                fontWeight: "bold",
                color: options.primaryColor,
              }}
            >
              {property_features.Price}
            </div>
          )}
        </div>

        {/* Thin separator line */}
        <div
          style={{
            height: "1px",
            backgroundColor: options.primaryColor,
            opacity: 0.2,
            marginBottom: "1.5rem",
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 px-6">
        {/* Main image */}
        {mainImage && (
          <div
            className="mb-6"
            style={{
              borderRadius: getBorderRadius(),
              overflow: "hidden",
            }}
          >
            <img
              src={mainImage.src || "/placeholder.svg"}
              alt={mainImage.alt}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Property details in a clean layout */}
        <div className="grid grid-cols-2 gap-12 mb-6">
          <div>
            <h2
              style={{
                fontSize: getFontSize(18),
                fontWeight: "bold",
                marginBottom: "1rem",
                color: options.primaryColor,
              }}
            >
              Property Details
            </h2>

            <div
              className="grid grid-cols-2 gap-y-3"
              style={{ fontSize: getFontSize(14) }}
            >
              <div>Bedrooms</div>
              <div style={{ fontWeight: "bold" }}>
                {property_features["Number of bedrooms"]}
              </div>

              <div>Bathrooms</div>
              <div style={{ fontWeight: "bold" }}>
                {property_features["Number of bathrooms"]}
              </div>

              <div>Square Footage</div>
              <div style={{ fontWeight: "bold" }}>
                {property_features["Square footage"]}
              </div>

              <div>Year Built</div>
              <div style={{ fontWeight: "bold" }}>
                {property_features["Year built"]}
              </div>

              <div>Lot Size</div>
              <div style={{ fontWeight: "bold" }}>
                {property_features["Lot size"]}
              </div>
            </div>
          </div>

          <div>
            <h2
              style={{
                fontSize: getFontSize(18),
                fontWeight: "bold",
                marginBottom: "1rem",
                color: options.primaryColor,
              }}
            >
              Description
            </h2>

            <p
              style={{
                fontSize: getFontSize(14),
                lineHeight: "1.6",
              }}
            >
              {property_type_info.property_description}
            </p>
          </div>
        </div>

        {/* Secondary images in a row */}
        {secondaryImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {secondaryImages.map((image, index) => (
              <div
                key={index}
                style={{
                  borderRadius: getBorderRadius(),
                  overflow: "hidden",
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
        )}

        {/* Key features in a clean list */}
        <div className="mb-6">
          <h2
            style={{
              fontSize: getFontSize(18),
              fontWeight: "bold",
              marginBottom: "1rem",
              color: options.primaryColor,
            }}
          >
            Key Features
          </h2>

          <div
            className="grid grid-cols-2 gap-x-8 gap-y-2"
            style={{ fontSize: getFontSize(14) }}
          >
            {property_features.Amenities &&
              property_features.Amenities.slice(0, 6).map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className="mr-2"
                    style={{ color: options.primaryColor }}
                  >
                    •
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
            borderTop: `1px solid ${options.primaryColor}`,
            borderTopOpacity: 0.2,
            padding: "1.5rem",
            margin: "0 1.5rem",
            fontSize: getFontSize(14),
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div style={{ fontWeight: "bold", color: options.primaryColor }}>
                {contact_info["Real estate company name"]}
              </div>
              <div>{contact_info["Contact person's name"]}</div>
            </div>
            <div className="text-right">
              <div>{contact_info["Phone number"]}</div>
              <div>{contact_info["Email address"]}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
