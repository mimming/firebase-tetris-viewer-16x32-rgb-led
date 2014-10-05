#ifndef RPI_GPIO_H
#define RPI_GPIO_H

#include <stdint.h>

// For now, everything is initialized as output.
class GPIO {
 public:
  // Available bits that actually have pins.
  static const uint32_t kValidBits;

  GPIO();

  // Initialize before use. Returns 'true' if successful, 'false' otherwise
  // (e.g. due to a permission problem).
  bool Init();

  // Initialize outputs.
  // Returns the bits that are actually set.
  uint32_t InitOutputs(uint32_t outputs);

  // Set the bits that are '1' in the output. Leave the rest untouched.
  inline void SetBits(uint32_t value) {
    *(gpio_port_ + 7) = value;
  }

  // Clear the bits that are '1' in the output. Leave the rest untouched.
  inline void ClearBits(uint32_t value) {
    *(gpio_port_ + 10) = value;
  }

  inline void Write(uint32_t value) {
    // Writing a word is two operations. The IO is actually pretty slow, so
    // this should probably  be unnoticable.
    SetBits(value & output_bits_);
    ClearBits(~value & output_bits_);
  }

 private:
  uint32_t output_bits_;
  volatile uint32_t *gpio_port_;
};

#endif  // RPI_GPIO_H
