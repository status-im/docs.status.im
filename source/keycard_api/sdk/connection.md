---
id: sdk_connection
title: Java SDK
---

# Connecting to the card

Before you can send commands to the Keycard, you must first connect to the card. Connection handling is the only task which is handled differently between Android an the desktop.

## Android

On Android, the NFC connection handling must happen on a thread separate from the UI thread. The SDK provides the class `NFCCardManager` to handle this. This an example activity starting the NFC reader and handling the connection to the card. Refer to the comments in the example for more information.

```java
public class MainActivity extends AppCompatActivity {
  private NfcAdapter nfcAdapter;
  private NFCCardManager cardManager;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    // Get the Android NFC default adapter
    nfcAdapter = NfcAdapter.getDefaultAdapter(this);
    
    // Create the NFCCardManager, this class is provided by the Keycard SDK and handles connections to the card
    cardManager = new NFCCardManager();

    // The Card Listener receives the connected/disconnected events. These can happen at any time since the user can
    // introduce or remove the card to/from the field at any time. This is where your code goes.
    cardManager.setCardListener(new CardListener() {
      @Override
      public void onConnected(CardChannel cardChannel) {
        // Card is connected. Here you can start working with the Keycard. The CardChannel is what you will use to
        // communicate with the card.
      }

      @Override
      public void onDisconnected() {
        // Card is disconnected (was removed from the field). You can perform cleanup here.
      }
    });
    cardManager.start();
  }

  @Override
  public void onResume() {
    super.onResume();
    
    // We need to enable the reader on resume.
    if (nfcAdapter != null) {
      nfcAdapter.enableReaderMode(this, this.cardManager, NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK, null);
    }
  }

  @Override
  public void onPause() {
    super.onPause();
    
    // We disable the reader on pause to allow other apps to use it.
    if (nfcAdapter != null) {
      nfcAdapter.disableReaderMode(this);
    }
  }
}
```

## Desktop

On the desktop we use the javax.smartcardio library. There are several ways to handle connections, the important part is getting a CardChannel open. Below is an example of how this can be achieved (assumes that a single smartcard reader is connected).

```java
// We create a TerminalFactory object
TerminalFactory tf = TerminalFactory.getDefault();
CardTerminal cardTerminal;

// We search a terminal with a card inside
for (CardTerminal t : tf.terminals().list()) {
if (t.isCardPresent()) {
  cardTerminal = t;
  break;
    }
  }
}

// If not found, we throw an exception. Of course you should decide how to handle this situation
if (cardTerminal == null) {
  throw new RuntimeException("No terminal found");
}

// If a terminal is found, we connect to it
Card apduCard = cardTerminal.connect("*");

// We create a PCSCCardChannel, which is an implementation of CardChannel and can be used with the rest of the SDK.
PCSCCardChannel apduChannel = new PCSCCardChannel(apduCard.getBasicChannel());
```
