const InputStyleCommon = {
    padding: '12px',
    borderRadius: '6px',
    birderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#d9d9d9',
    lineHeight: '1.5'
}

export const InputStyleRegular = {
    ...InputStyleCommon,
    background: 'rgb(245, 245, 255)',
}

export const InputStyleDark = {
    ...InputStyleCommon,
    background: 'black',
    color: 'white'
}


const DivStyleCommon = {
    width: '100%',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '500px',
    padding: '32px',
    borderRadius: '12px',
}

export const DivStyleRegular = {
    ...DivStyleCommon,
    background: 'rgba(250, 237, 181, 0.6)',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 8px 24px'
}

export const DivStyleDark = {
    ...DivStyleCommon,
}

export const FormStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    fontFamily: `BlinkMacSystemFont`
}

export const SubmitBtn = {
    fontWeight: '600',
    fontSize: '16px',
    borderRadius: '6px',
    width: '100%',
    color: '#fff',
    background: '#284497',
    minHeight: '48px',
    boxShadow: '0 2px 0 rgba(10,37,69,0.22)',
    border: 'none',
    cursor: 'pointer'
}

export const LabelStyle = {
    color: 'rgb(40, 68, 151)',
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '8px'
}

export const FormGroup = {
    display: 'flex',
    flexDirection: 'column'
}

export const ErrorStyle = {
    fontSize: '14px',
    color: '#973333'
}