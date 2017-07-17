
import binascii

f = open('blockchain_headers', 'rb')
g = open('headers.csv', 'wt')
header = 'version,ph1,ph2,ph3,ph4,ph5,ph6,ph7,ph8,m1,m2,m3,m4,m5,m6,m7,m8,time,nbits,nonce\n'
g.write(header)
while f.peek(80):
    version = int.from_bytes(f.read(4), 'big')
    ph1 = int.from_bytes(f.read(4), 'big')
    ph2 = int.from_bytes(f.read(4), 'big')
    ph3 = int.from_bytes(f.read(4), 'big')
    ph4 = int.from_bytes(f.read(4), 'big')
    ph5 = int.from_bytes(f.read(4), 'big')
    ph6 = int.from_bytes(f.read(4), 'big')
    ph7 = int.from_bytes(f.read(4), 'big')
    ph8 = int.from_bytes(f.read(4), 'big')
    m1 = int.from_bytes(f.read(4), 'big')
    m2 = int.from_bytes(f.read(4), 'big')
    m3 = int.from_bytes(f.read(4), 'big')
    m4 = int.from_bytes(f.read(4), 'big')
    m5 = int.from_bytes(f.read(4), 'big')
    m6 = int.from_bytes(f.read(4), 'big')
    m7 = int.from_bytes(f.read(4), 'big')
    m8 = int.from_bytes(f.read(4), 'big')
    time = int.from_bytes(f.read(4), 'big')
    nbits = int.from_bytes(f.read(4), 'big')
    nonce = int.from_bytes(f.read(4), 'big')
    out = str(version) + ',' + str(ph1) + ',' + str(ph1) + ',' + str(ph1) + ',' + str(ph1) + ',' + str(ph1) + ',' + str(ph1) + ',' + str(ph1) + ',' + str(ph1) + ',' + str(m1) + ',' + str(m2) + ',' + str(m3) + ',' + str(m4) + ',' + str(m5) + ',' + str(m6) + ',' + str(m7) + ',' + str(m8) + ',' + str(time) + ',' + str(nbits) + ',' + str(nonce) + '\n'
    g.write(out)

    
