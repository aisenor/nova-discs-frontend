import React, { useState } from 'react';
import styles from './StampDescription.module.css';

const StampDescription = ({ data }) => {

    return (
        <div className={styles.page}>
            <h1>Create your Custom Rubber Stamp Today</h1>
            <h2>Stamp Examples and Order Form below</h2>
            <br/>
            <h3>We are excited to now be able to offer Curved Stamps at $40</h3>
            <p>
                This will allow you to stamp the inner rim of the disk with your name, phone number, and PDGA number.
                Or any one of those on their own. The actual stamps are roughly 1cm high and their base is curved.
            </p>
            <div className={styles.curvedStampPhone}>
                <img src="../images/curved_phone_only.png" alt="curved stamp img"/>
            </div>
            or
            <div className={styles.curvedStamp}>
                <img src="../images/Curved Stamps.png" alt="curved stamp img"/>
            </div>
            <br/>
            <h3>Basic Stamps starting at $35</h3>
            <p>A basic stamp is one that can include your name, phone number, and PDGA number, as well as
                as simple inital or signature at the focal point.
            </p>

            <div className={styles.basicStamp}>
                <img src="../images/CB basic stamp.jpg" alt="basic stamp img"/>
            </div>

            <h3>Advanced Stamp starting at $40</h3>
            <p>An advanced stamp is one that includes an image. This would be the option you'd choose if you had
                a logo that you wanted put on a stamp. The higher quality of image, the better. Low quality images will
                require more design effort which will be reflected in the cost.
            </p>
            <div className={styles.advancedStamp}>
                <img src="../images/whale.jpg" alt="advances stamp img"/>
                <img src="../images/mc esher.jpg" alt="advances stamp img"/>
                <img src="../images/Bender.jpg" alt="advances stamp img"/>
                <img src="../images/crown.jpg" alt="advances stamp img"/>
            </div>

            <h3>Expert Stamp starting at $50</h3>
            <p>An expert stamp is one that requires the most design work. If you have an idea and need help
                bringing it to life, this is the option for you. If you have multiple images and want them melded
                together, that can also be done on an Expert Stamp
            </p>

            <h3>Extra Ink $15</h3>
            <p>Just looking for some StazOn ink to go with a stamp you already have? We can do that!
            </p>
        </div>
    );
};

export default StampDescription;
