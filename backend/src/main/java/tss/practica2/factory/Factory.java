package tss.practica2.factory;

import java.util.ArrayList;
import java.util.Collections;

import lombok.Data;

@Data
public class Factory {

    private ArrayList<Barra> barras;

    public Factory(){
    }

    public ArrayList<Barra> pedirMinimo(ArrayList<Double> pedidos){
        this.barras = new ArrayList<>();
        Collections.sort(pedidos, Collections.reverseOrder());//Ordena de mayor a menor
        for(int i = 0; i<pedidos.size(); i++){
            if(existeEseTamanio(pedidos.get(i))){
            }else{
                Barra barra = new Barra();
                Fierro fierro = new Fierro(pedidos.get(i));
                barra.addFierro(fierro);
                barras.add(barra);
            }
        }
        return barras;
    }

    public ArrayList<Barra> pedirFifo(ArrayList<Double> pedidos){
        this.barras = new ArrayList<>();
        for(int i = 0; i<pedidos.size(); i++){
            if(existeEseTamanio(pedidos.get(i))){
            }else{
                Barra barra = new Barra();
                Fierro fierro = new Fierro(pedidos.get(i));
                barra.addFierro(fierro);
                barras.add(barra);
            }
        }
        return barras;
    }

    public ArrayList<Barra> pedirPermutacion(ArrayList<Double> pedidos){
        ArrayList<Barra> pedidoMinimo = new ArrayList<>();
        double desperdicioMinimo = Double.MAX_VALUE;
        ArrayList<ArrayList<Double>> permutaciones = generarPermutaciones(pedidos);
        ArrayList<Barra> barrasActuales;
        for (ArrayList<Double> permutacion : permutaciones) {
            barrasActuales = pedirFifo(permutacion);
    
            double desperdicioActual = calcularDesperdicio(barrasActuales);
    
            if (desperdicioActual < desperdicioMinimo) {
                desperdicioMinimo = desperdicioActual;
                pedidoMinimo = barrasActuales;
            }
        }
        return pedidoMinimo;
    }

    private boolean existeEseTamanio(double tamanio){
        boolean res = false;
        for(Barra barra: barras){
            if(barra.getLongitud() >= tamanio){
                Fierro fierro = new Fierro(tamanio);
                barra.addFierro(fierro);
                res = true;
                break;
            }
        }
        return res;
    }

    private double calcularDesperdicio(ArrayList<Barra> barras){
        double desperdicio = 0;
        for(Barra barra: barras){
            desperdicio += barra.getLongitud();
        }
        return desperdicio;
    }
    private ArrayList<ArrayList<Double>> generarPermutaciones(ArrayList<Double> lista) {
        ArrayList<ArrayList<Double>> resultado = new ArrayList<>();
        permutar(lista, 0, resultado);
        return resultado;
    }

    private void permutar(ArrayList<Double> lista, int indice, ArrayList<ArrayList<Double>> resultado) {
        if (indice == lista.size()) {
            resultado.add(new ArrayList<>(lista));
        } else {
            for (int i = indice; i < lista.size(); i++) {
                Collections.swap(lista, indice, i);
                permutar(lista, indice + 1, resultado);
                Collections.swap(lista, indice, i);
            }
        }
    }

}
