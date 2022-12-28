export const MinHR = {
    thresholdName: 'MinHR',
    value: 40,
};

export const MaxHR = {
    thresholdName: 'MaxHR',
    value: 220,
};

export const MinTemp = {
    thresholdName: 'MinTemp',
    value: 32,
};

export const MaxTemp = {
    thresholdName: 'MaxTemp',
    value: 42,
};

export const MinSpO2 = {
    thresholdName: 'MinSpO2',
    value: 40,
};

export const MinRR = {
    thresholdName: 'MinRR',
    value: 4,
};

export const MaxRR = {
    thresholdName: 'MaxRR',
    value: 60,
};

export const MinDBP = {
    thresholdName: 'MinDBP',
    value: 30,
};

export const MaxDBP = {
    thresholdName: 'MaxDBP',
    value: 130,
};

export const MinSBP = {
    thresholdName: 'MinSBP',
    value: 70,
};

export const MaxSBP = {
    thresholdName: 'MaxSBP',
    value: 220,
};

export const MinMAP = {
    thresholdName: 'MinMAP',
    value: 43, // Calculated by the formula: MinMAP ~ 1/3(MinSBP + 2MinDBP)
};

export const MaxMAP = {
    thresholdName: 'MaxMAP',
    value: 160, // Calculated by the formula: MaxMAP ~ 1/3(MaxSBP + 2MaxDBP)
};
