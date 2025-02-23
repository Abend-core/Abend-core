const follows = [
    // Rudy (3 suivis)
    {
        UserId: "018f3b9c-93a6-772f-bc34-4d2f8e3d5a6b",
        UserIdFollow: "018f3c2b-93a6-772f-bc34-4d2f8e3d5a7c",
    }, // suit Lucas
    {
        UserId: "018f3b9c-93a6-772f-bc34-4d2f8e3d5a6b",
        UserIdFollow: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
    }, // suit David
    {
        UserId: "018f3b9c-93a6-772f-bc34-4d2f8e3d5a6b",
        UserIdFollow: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
    }, // suit Charlotte

    // Lucas (2 suivis)
    {
        UserId: "018f3c2b-93a6-772f-bc34-4d2f8e3d5a7c",
        UserIdFollow: "018f3db9-93a6-772f-bc34-4d2f8e3d5a87",
    }, // suit Maxime
    {
        UserId: "018f3c2b-93a6-772f-bc34-4d2f8e3d5a7c",
        UserIdFollow: "018f3d43-93a6-772f-bc34-4d2f8e3d5a84",
    }, // suit Sophia

    // Hugo (4 suivis)
    {
        UserId: "018f3c5d-93a6-772f-bc34-4d2f8e3d5a7f",
        UserIdFollow: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
    }, // suit Emma
    {
        UserId: "018f3c5d-93a6-772f-bc34-4d2f8e3d5a7f",
        UserIdFollow: "018f3e0d-93a6-772f-bc34-4d2f8e3d5a89",
    }, // suit Victor
    {
        UserId: "018f3c5d-93a6-772f-bc34-4d2f8e3d5a7f",
        UserIdFollow: "018f3cf6-93a6-772f-bc34-4d2f8e3d5a82",
    }, // suit Alice
    {
        UserId: "018f3c5d-93a6-772f-bc34-4d2f8e3d5a7f",
        UserIdFollow: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
    }, // suit Theo

    // Jerome (1 suivi)
    {
        UserId: "018f3ca1-93a6-772f-bc34-4d2f8e3d5a80",
        UserIdFollow: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
    }, // suit David

    // Emma (5 suivis)
    {
        UserId: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
        UserIdFollow: "018f3c5d-93a6-772f-bc34-4d2f8e3d5a7f",
    }, // suit Hugo
    {
        UserId: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
        UserIdFollow: "018f3e8b-93a6-772f-bc34-4d2f8e3d5a8c",
    }, // suit Eva
    {
        UserId: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
        UserIdFollow: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
    }, // suit Sophie
    {
        UserId: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
        UserIdFollow: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
    }, // suit Sofia
    {
        UserId: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
        UserIdFollow: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
    }, // suit Michael

    // Alice (0 suivi)
    // Pas de suivi pour Alice

    // David (3 suivis)
    {
        UserId: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
        UserIdFollow: "018f3ca1-93a6-772f-bc34-4d2f8e3d5a80",
    }, // suit Jerome
    {
        UserId: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
        UserIdFollow: "018f3c2b-93a6-772f-bc34-4d2f8e3d5a7c",
    }, // suit Lucas
    {
        UserId: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
        UserIdFollow: "018f3fb0-93a6-772f-bc34-4d2f8e3d5a93",
    }, // suit Benoit

    // Sophia (2 suivis)
    {
        UserId: "018f3d43-93a6-772f-bc34-4d2f8e3d5a84",
        UserIdFollow: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
    }, // suit Charlotte
    {
        UserId: "018f3d43-93a6-772f-bc34-4d2f8e3d5a84",
        UserIdFollow: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
    }, // suit Sofia

    // John (6 suivis)
    {
        UserId: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
        UserIdFollow: "018f3f86-93a6-772f-bc34-4d2f8e3d5a92",
    }, // suit Jules
    {
        UserId: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
        UserIdFollow: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
    }, // suit Michael
    {
        UserId: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
        UserIdFollow: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
    }, // suit Samuel
    {
        UserId: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
        UserIdFollow: "018f3ede-93a6-772f-bc34-4d2f8e3d5a8e",
    }, // suit Paul
    {
        UserId: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
        UserIdFollow: "018f4082-93a6-772f-bc34-4d2f8e3d5a98",
    }, // suit Thomas
    {
        UserId: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
        UserIdFollow: "018f3f32-93a6-772f-bc34-4d2f8e3d5a90",
    }, // suit George

    // Michael (4 suivis)
    {
        UserId: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
        UserIdFollow: "018f402e-93a6-772f-bc34-4d2f8e3d5a96",
    }, // suit Oscar
    {
        UserId: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
        UserIdFollow: "018f4004-93a6-772f-bc34-4d2f8e3d5a95",
    }, // suit Mia
    {
        UserId: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
        UserIdFollow: "018f3b9c-93a6-772f-bc34-4d2f8e3d5a6b",
    }, // suit Rudy
    {
        UserId: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
        UserIdFollow: "018f3e37-93a6-772f-bc34-4d2f8e3d5a8a",
    }, // suit Lena

    // Maxime (1 suivi)
    {
        UserId: "018f3db9-93a6-772f-bc34-4d2f8e3d5a87",
        UserIdFollow: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
    }, // suit Theo

    // Clara (3 suivis)
    {
        UserId: "018f3de3-93a6-772f-bc34-4d2f8e3d5a88",
        UserIdFollow: "018f3cf6-93a6-772f-bc34-4d2f8e3d5a82",
    }, // suit Alice
    {
        UserId: "018f3de3-93a6-772f-bc34-4d2f8e3d5a88",
        UserIdFollow: "018f40ac-93a6-772f-bc34-4d2f8e3d5a99",
    }, // suit Justine
    {
        UserId: "018f3de3-93a6-772f-bc34-4d2f8e3d5a88",
        UserIdFollow: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
    }, // suit Charlotte

    // Victor (2 suivis)
    {
        UserId: "018f3e0d-93a6-772f-bc34-4d2f8e3d5a89",
        UserIdFollow: "018f3f32-93a6-772f-bc34-4d2f8e3d5a90",
    }, // suit George
    {
        UserId: "018f3e0d-93a6-772f-bc34-4d2f8e3d5a89",
        UserIdFollow: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
    }, // suit Samuel

    // Lena (0 suivi)
    // Pas de suivi pour Lena

    // Samuel (5 suivis)
    {
        UserId: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
        UserIdFollow: "018f4082-93a6-772f-bc34-4d2f8e3d5a98",
    }, // suit Thomas
    {
        UserId: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
        UserIdFollow: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
    }, // suit John
    {
        UserId: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
        UserIdFollow: "018f3ede-93a6-772f-bc34-4d2f8e3d5a8e",
    }, // suit Paul
    {
        UserId: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
        UserIdFollow: "018f3e0d-93a6-772f-bc34-4d2f8e3d5a89",
    }, // suit Victor
    {
        UserId: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
        UserIdFollow: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
    }, // suit Sophie

    // Eva (2 suivis)
    {
        UserId: "018f3e8b-93a6-772f-bc34-4d2f8e3d5a8c",
        UserIdFollow: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
    }, // suit Emma
    {
        UserId: "018f3e8b-93a6-772f-bc34-4d2f8e3d5a8c",
        UserIdFollow: "018f3de3-93a6-772f-bc34-4d2f8e3d5a88",
    }, // suit Clara

    // Mathieu (3 suivis)
    {
        UserId: "018f3eb5-93a6-772f-bc34-4d2f8e3d5a8d",
        UserIdFollow: "018f3b9c-93a6-772f-bc34-4d2f8e3d5a6b",
    }, // suit Rudy
    {
        UserId: "018f3eb5-93a6-772f-bc34-4d2f8e3d5a8d",
        UserIdFollow: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
    }, // suit David
    {
        UserId: "018f3eb5-93a6-772f-bc34-4d2f8e3d5a8d",
        UserIdFollow: "018f3fb0-93a6-772f-bc34-4d2f8e3d5a93",
    }, // suit Benoit

    // Paul (1 suivi)
    {
        UserId: "018f3ede-93a6-772f-bc34-4d2f8e3d5a8e",
        UserIdFollow: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
    }, // suit Samuel

    // Sophie (4 suivis)
    {
        UserId: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
        UserIdFollow: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
    }, // suit Theo
    {
        UserId: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
        UserIdFollow: "018f3db9-93a6-772f-bc34-4d2f8e3d5a87",
    }, // suit Maxime
    {
        UserId: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
        UserIdFollow: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
    }, // suit Emma
    {
        UserId: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
        UserIdFollow: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
    }, // suit Samuel

    // George (2 suivis)
    {
        UserId: "018f3f32-93a6-772f-bc34-4d2f8e3d5a90",
        UserIdFollow: "018f3e0d-93a6-772f-bc34-4d2f8e3d5a89",
    }, // suit Victor
    {
        UserId: "018f3f32-93a6-772f-bc34-4d2f8e3d5a90",
        UserIdFollow: "018f402e-93a6-772f-bc34-4d2f8e3d5a96",
    }, // suit Oscar

    // Charlotte (3 suivis)
    {
        UserId: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
        UserIdFollow: "018f3d43-93a6-772f-bc34-4d2f8e3d5a84",
    }, // suit Sophia
    {
        UserId: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
        UserIdFollow: "018f3de3-93a6-772f-bc34-4d2f8e3d5a88",
    }, // suit Clara
    {
        UserId: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
        UserIdFollow: "018f3b9c-93a6-772f-bc34-4d2f8e3d5a6b",
    }, // suit Rudy

    // Jules (1 suivi)
    {
        UserId: "018f3f86-93a6-772f-bc34-4d2f8e3d5a92",
        UserIdFollow: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
    }, // suit John

    // Benoit (4 suivis)
    {
        UserId: "018f3fb0-93a6-772f-bc34-4d2f8e3d5a93",
        UserIdFollow: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
    }, // suit David
    {
        UserId: "018f3fb0-93a6-772f-bc34-4d2f8e3d5a93",
        UserIdFollow: "018f3eb5-93a6-772f-bc34-4d2f8e3d5a8d",
    }, // suit Mathieu
    {
        UserId: "018f3fb0-93a6-772f-bc34-4d2f8e3d5a93",
        UserIdFollow: "018f3c2b-93a6-772f-bc34-4d2f8e3d5a7c",
    }, // suit Lucas
    {
        UserId: "018f3fb0-93a6-772f-bc34-4d2f8e3d5a93",
        UserIdFollow: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
    }, // suit Charlotte

    // Celine (2 suivis)
    {
        UserId: "018f3fda-93a6-772f-bc34-4d2f8e3d5a94",
        UserIdFollow: "018f3e37-93a6-772f-bc34-4d2f8e3d5a8a",
    }, // suit Lena
    {
        UserId: "018f3fda-93a6-772f-bc34-4d2f8e3d5a94",
        UserIdFollow: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
    }, // suit Sophie

    // Mia (3 suivis)
    {
        UserId: "018f4004-93a6-772f-bc34-4d2f8e3d5a95",
        UserIdFollow: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
    }, // suit Michael
    {
        UserId: "018f4004-93a6-772f-bc34-4d2f8e3d5a95",
        UserIdFollow: "018f402e-93a6-772f-bc34-4d2f8e3d5a96",
    }, // suit Oscar
    {
        UserId: "018f4004-93a6-772f-bc34-4d2f8e3d5a95",
        UserIdFollow: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
    }, // suit Sofia

    // Oscar (2 suivis)
    {
        UserId: "018f402e-93a6-772f-bc34-4d2f8e3d5a96",
        UserIdFollow: "018f3f32-93a6-772f-bc34-4d2f8e3d5a90",
    }, // suit George
    {
        UserId: "018f402e-93a6-772f-bc34-4d2f8e3d5a96",
        UserIdFollow: "018f4004-93a6-772f-bc34-4d2f8e3d5a95",
    }, // suit Mia

    // Sofia (4 suivis)
    {
        UserId: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
        UserIdFollow: "018f3d43-93a6-772f-bc34-4d2f8e3d5a84",
    }, // suit Sophia
    {
        UserId: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
        UserIdFollow: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
    }, // suit Emma
    {
        UserId: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
        UserIdFollow: "018f4004-93a6-772f-bc34-4d2f8e3d5a95",
    }, // suit Mia
    {
        UserId: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
        UserIdFollow: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
    }, // suit Charlotte

    // Thomas (3 suivis)
    {
        UserId: "018f4082-93a6-772f-bc34-4d2f8e3d5a98",
        UserIdFollow: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
    }, // suit Samuel
    {
        UserId: "018f4082-93a6-772f-bc34-4d2f8e3d5a98",
        UserIdFollow: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
    }, // suit John
    {
        UserId: "018f4082-93a6-772f-bc34-4d2f8e3d5a98",
        UserIdFollow: "018f3ede-93a6-772f-bc34-4d2f8e3d5a8e",
    }, // suit Paul

    // Justine (1 suivi)
    {
        UserId: "018f40ac-93a6-772f-bc34-4d2f8e3d5a99",
        UserIdFollow: "018f3de3-93a6-772f-bc34-4d2f8e3d5a88",
    }, // suit Clara

    // Theo (5 suivis)
    {
        UserId: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
        UserIdFollow: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
    }, // suit Sophie
    {
        UserId: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
        UserIdFollow: "018f3db9-93a6-772f-bc34-4d2f8e3d5a87",
    }, // suit Maxime
    {
        UserId: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
        UserIdFollow: "018f3c5d-93a6-772f-bc34-4d2f8e3d5a7f",
    }, // suit Hugo
    {
        UserId: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
        UserIdFollow: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
    }, // suit Samuel
    {
        UserId: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
        UserIdFollow: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
    }, // suit Sophie (doublon volontaire pour tester)
];

export { follows };
